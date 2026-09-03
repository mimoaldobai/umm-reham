using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UmmReham.Application.DTOs;
using UmmReham.Domain.Entities;
using UmmReham.Domain.Interfaces;

namespace UmmReham.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _repo;
    public CategoriesController(ICategoryRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var items = await _repo.GetActiveAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<CategoryWithServicesDto>> GetBySlug(string slug)
    {
        var item = await _repo.GetWithServicesAsync(slug);
        if (item == null) return NotFound();
        return Ok(new CategoryWithServicesDto(
            item.Id, item.NameAr, item.NameEn, item.Slug,
            item.DescriptionAr, item.DescriptionEn, item.IconSvg,
            item.CoverImageUrl, item.SortOrder,
            item.Services.Select(s => new ServiceDto(
                s.Id, s.CategoryId, s.NameAr, s.NameEn, s.Slug,
                s.ShortDescriptionAr, s.ShortDescriptionEn,
                s.IconSvg, s.CoverImageUrl, s.PriceType,
                s.PriceMin, s.PriceMax, s.PriceCurrency,
                s.EstimatedDuration, s.SortOrder, s.IsActive, s.IsFeatured,
                item.NameAr, s.CreatedAt))));
    }

    // Admin CRUD
    [Authorize]
    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllAdmin()
    {
        var items = await _repo.GetAllAsync();
        return Ok(items.Select(MapToDto));
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryDto dto)
    {
        var entity = new Category
        {
            NameAr = dto.NameAr, NameEn = dto.NameEn, Slug = dto.Slug,
            DescriptionAr = dto.DescriptionAr, DescriptionEn = dto.DescriptionEn,
            IconSvg = dto.IconSvg, CoverImageUrl = dto.CoverImageUrl, SortOrder = dto.SortOrder
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetBySlug), new { slug = entity.Slug }, MapToDto(entity));
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateCategoryDto dto)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return NotFound();
        entity.NameAr = dto.NameAr; entity.NameEn = dto.NameEn; entity.Slug = dto.Slug;
        entity.DescriptionAr = dto.DescriptionAr; entity.DescriptionEn = dto.DescriptionEn;
        entity.IconSvg = dto.IconSvg; entity.CoverImageUrl = dto.CoverImageUrl;
        entity.SortOrder = dto.SortOrder; entity.IsActive = dto.IsActive;
        await _repo.UpdateAsync(entity);
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }

    private static CategoryDto MapToDto(Category c) => new(
        c.Id, c.NameAr, c.NameEn, c.Slug,
        c.DescriptionAr, c.DescriptionEn, c.IconSvg,
        c.CoverImageUrl, c.SortOrder, c.IsActive, c.CreatedAt);
}
