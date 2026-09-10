using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UmmReham.Application.DTOs;
using UmmReham.Domain.Entities;
using UmmReham.Domain.Interfaces;

namespace UmmReham.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceRepository _repo;
    public ServicesController(IServiceRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAll([FromQuery] Guid? categoryId)
    {
        var items = categoryId.HasValue
            ? await _repo.GetByCategoryAsync(categoryId.Value)
            : await _repo.GetActiveAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<ServiceDto>>> GetFeatured()
    {
        var items = await _repo.GetFeaturedAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ServiceDetailDto>> GetBySlug(string slug)
    {
        var s = await _repo.GetWithDetailsAsync(slug);
        if (s == null) return NotFound();
        return Ok(new ServiceDetailDto(
            s.Id, s.CategoryId, s.NameAr, s.NameEn, s.Slug,
            s.ShortDescriptionAr, s.ShortDescriptionEn,
            s.FullDescriptionAr, s.FullDescriptionEn,
            s.TargetAudienceAr, s.RequirementsAr,
            s.AvailableOptions, s.IconSvg, s.CoverImageUrl,
            s.GalleryImages, s.PriceType, s.PriceMin, s.PriceMax,
            s.PriceCurrency, s.EstimatedDuration, s.IsFeatured,
            s.SeoTitle, s.SeoDescription, s.Category?.NameAr,
            s.PortfolioItems?.Select(p => new PortfolioItemDto(
                p.Id, p.ServiceId, p.CategoryId, p.TitleAr, p.TitleEn,
                p.DescriptionAr, p.DescriptionEn, p.ClientName, p.University,
                p.Specialization, p.Degree, p.CoverImageUrl, p.FileUrl, p.VideoUrl, p.GalleryImages, p.Tags,
                p.IsFeatured, p.IsActive, p.CompletedAt, s.NameAr, s.Category?.NameAr)),
            s.Testimonials?.Select(t => new TestimonialDto(
                t.Id, t.ClientName, t.ClientTitle,
                t.ClientPhone, t.ClientEmail, t.Country, t.City,
                t.ClientUniversity,
                t.ContentAr, t.ContentEn, t.Rating, t.ServiceId, t.IsFeatured,
                s.NameAr, t.CreatedAt))));
    }

    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAllAdmin()
    {
        var items = await _repo.GetAllAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpPost]
    public async Task<ActionResult<ServiceDto>> Create([FromBody] CreateServiceDto dto)
    {
        var slug = string.IsNullOrWhiteSpace(dto.Slug) 
            ? ("service-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()) 
            : dto.Slug.Trim();

        var entity = new Service
        {
            CategoryId = dto.CategoryId,
            NameAr = dto.NameAr,
            NameEn = dto.NameEn,
            Slug = slug,
            ShortDescriptionAr = dto.ShortDescriptionAr,
            ShortDescriptionEn = dto.ShortDescriptionEn,
            FullDescriptionAr = dto.FullDescriptionAr,
            FullDescriptionEn = dto.FullDescriptionEn,
            TargetAudienceAr = dto.TargetAudienceAr,
            RequirementsAr = dto.RequirementsAr,
            AvailableOptions = dto.AvailableOptions ?? "[]",
            PriceType = dto.PriceType,
            PriceMin = dto.PriceMin,
            PriceMax = dto.PriceMax,
            PriceCurrency = dto.PriceCurrency ?? "SAR",
            EstimatedDuration = dto.EstimatedDuration,
            IconSvg = dto.IconSvg,
            CoverImageUrl = dto.CoverImageUrl,
            GalleryImages = dto.GalleryImages ?? "[]",
            SortOrder = dto.SortOrder,
            IsFeatured = dto.IsFeatured,
            SeoTitle = dto.SeoTitle,
            SeoDescription = dto.SeoDescription
        };
        await _repo.AddAsync(entity);
        return Ok(MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, [FromBody] UpdateServiceDto dto)
    {
        Service? entity = null;
        if (Guid.TryParse(id, out var guid))
        {
            entity = await _repo.GetByIdAsync(guid);
        }
        if (entity == null)
        {
            entity = await _repo.GetBySlugAsync(id);
        }
        if (entity == null) return NotFound();

        entity.CategoryId = dto.CategoryId;
        entity.NameAr = dto.NameAr;
        entity.NameEn = dto.NameEn;
        entity.Slug = string.IsNullOrWhiteSpace(dto.Slug) ? entity.Slug : dto.Slug;
        entity.ShortDescriptionAr = dto.ShortDescriptionAr;
        entity.ShortDescriptionEn = dto.ShortDescriptionEn;
        entity.FullDescriptionAr = dto.FullDescriptionAr;
        entity.FullDescriptionEn = dto.FullDescriptionEn;
        entity.TargetAudienceAr = dto.TargetAudienceAr;
        entity.RequirementsAr = dto.RequirementsAr;
        entity.AvailableOptions = dto.AvailableOptions ?? "[]";
        entity.PriceType = dto.PriceType;
        entity.PriceMin = dto.PriceMin;
        entity.PriceMax = dto.PriceMax;
        entity.PriceCurrency = dto.PriceCurrency ?? "SAR";
        entity.EstimatedDuration = dto.EstimatedDuration;
        entity.IconSvg = dto.IconSvg;
        entity.CoverImageUrl = dto.CoverImageUrl;
        entity.GalleryImages = dto.GalleryImages ?? "[]";
        entity.SortOrder = dto.SortOrder;
        entity.IsActive = dto.IsActive;
        entity.IsFeatured = dto.IsFeatured;
        entity.SeoTitle = dto.SeoTitle;
        entity.SeoDescription = dto.SeoDescription;
        await _repo.UpdateAsync(entity);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        if (Guid.TryParse(id, out var guid))
        {
            await _repo.DeleteAsync(guid);
            return NoContent();
        }
        var entity = await _repo.GetBySlugAsync(id);
        if (entity != null)
        {
            await _repo.DeleteAsync(entity.Id);
        }
        return NoContent();
    }

    private static ServiceDto MapToDto(Service s) => new(
        s.Id, s.CategoryId, s.NameAr, s.NameEn, s.Slug,
        s.ShortDescriptionAr, s.ShortDescriptionEn,
        s.IconSvg, s.CoverImageUrl, s.PriceType,
        s.PriceMin, s.PriceMax, s.PriceCurrency,
        s.EstimatedDuration, s.SortOrder, s.IsActive, s.IsFeatured,
        s.Category?.NameAr, s.CreatedAt, s.AvailableOptions);
}
