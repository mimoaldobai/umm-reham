using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UmmReham.Application.DTOs;
using UmmReham.Domain.Entities;
using UmmReham.Domain.Interfaces;

namespace UmmReham.API.Controllers;

// ========================
// PORTFOLIO CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IPortfolioRepository _repo;
    public PortfolioController(IPortfolioRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PortfolioItemDto>>> GetAll([FromQuery] Guid? categoryId, [FromQuery] Guid? serviceId)
    {
        IEnumerable<PortfolioItem> items;
        if (categoryId.HasValue) items = await _repo.GetByCategoryAsync(categoryId.Value);
        else if (serviceId.HasValue) items = await _repo.GetByServiceAsync(serviceId.Value);
        else items = await _repo.GetActiveAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<PortfolioItemDto>>> GetAllAdmin()
    {
        var items = await _repo.GetAllAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<PortfolioItemDto>>> GetFeatured()
        => Ok((await _repo.GetFeaturedAsync()).Select(MapToDto));

    [HttpGet("{id}")]
    public async Task<ActionResult<PortfolioItemDto>> GetById(Guid id)
    {
        var item = await _repo.GetByIdAsync(id);
        return item == null ? NotFound() : Ok(MapToDto(item));
    }

    [HttpPost]
    public async Task<ActionResult<PortfolioItemDto>> Create([FromBody] CreatePortfolioItemDto dto)
    {
        var entity = new PortfolioItem
        {
            ServiceId = dto.ServiceId, CategoryId = dto.CategoryId,
            TitleAr = dto.TitleAr, TitleEn = dto.TitleEn,
            DescriptionAr = dto.DescriptionAr, DescriptionEn = dto.DescriptionEn,
            ClientName = dto.ClientName, University = dto.University,
            Specialization = dto.Specialization, Degree = dto.Degree,
            CoverImageUrl = dto.CoverImageUrl, FileUrl = dto.FileUrl, VideoUrl = dto.VideoUrl,
            GalleryImages = dto.GalleryImages ?? "[]", Tags = dto.Tags ?? "[]",
            IsFeatured = dto.IsFeatured, IsActive = dto.IsActive, CompletedAt = dto.CompletedAt
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CreatePortfolioItemDto dto)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e == null) return NotFound();
        e.ServiceId = dto.ServiceId; e.CategoryId = dto.CategoryId;
        e.TitleAr = dto.TitleAr; e.TitleEn = dto.TitleEn;
        e.DescriptionAr = dto.DescriptionAr; e.DescriptionEn = dto.DescriptionEn;
        e.ClientName = dto.ClientName; e.University = dto.University;
        e.Specialization = dto.Specialization; e.Degree = dto.Degree;
        e.CoverImageUrl = dto.CoverImageUrl; e.FileUrl = dto.FileUrl; e.VideoUrl = dto.VideoUrl;
        e.GalleryImages = dto.GalleryImages ?? "[]"; e.Tags = dto.Tags ?? "[]";
        e.IsFeatured = dto.IsFeatured; e.IsActive = dto.IsActive; e.CompletedAt = dto.CompletedAt;
        await _repo.UpdateAsync(e);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }

    private static PortfolioItemDto MapToDto(PortfolioItem p) => new(
        p.Id, p.ServiceId, p.CategoryId, p.TitleAr, p.TitleEn,
        p.DescriptionAr, p.DescriptionEn, p.ClientName, p.University,
        p.Specialization, p.Degree, p.CoverImageUrl, p.FileUrl, p.VideoUrl, p.GalleryImages, p.Tags,
        p.IsFeatured, p.IsActive, p.CompletedAt, p.Service?.NameAr, p.Category?.NameAr);
}

// ========================
// PAGES CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class PagesController : ControllerBase
{
    private readonly IPageRepository _repo;
    public PagesController(IPageRepository repo) => _repo = repo;

    [HttpGet("{slug}")]
    public async Task<ActionResult<PageDto>> GetBySlug(string slug)
    {
        var p = await _repo.GetBySlugAsync(slug);
        if (p == null || !p.IsPublished) return NotFound();
        return Ok(MapToDto(p));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PageDto>>> GetPublished()
        => Ok((await _repo.GetPublishedAsync()).Select(MapToDto));

    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<PageDto>>> GetAllAdmin()
        => Ok((await _repo.GetAllAsync()).Select(MapToDto));

    [HttpPost]
    public async Task<ActionResult<PageDto>> Create([FromBody] CreatePageDto dto)
    {
        var entity = new Page
        {
            TitleAr = dto.TitleAr, TitleEn = dto.TitleEn, Slug = dto.Slug,
            ContentAr = dto.ContentAr, ContentEn = dto.ContentEn,
            PageType = dto.PageType, Template = dto.Template,
            CoverImageUrl = dto.CoverImageUrl, Sections = dto.Sections ?? "[]",
            SeoTitle = dto.SeoTitle, SeoDescription = dto.SeoDescription,
            IsPublished = dto.IsPublished, ParentId = dto.ParentId
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetBySlug), new { slug = entity.Slug }, MapToDto(entity));
    }

    [HttpPut("{idOrSlug}")]
    public async Task<ActionResult> Update(string idOrSlug, [FromBody] CreatePageDto dto)
    {
        Page? e = null;
        if (Guid.TryParse(idOrSlug, out var id))
        {
            e = await _repo.GetByIdAsync(id);
        }
        if (e == null)
        {
            e = await _repo.GetBySlugAsync(idOrSlug);
        }
        if (e == null) return NotFound();

        e.TitleAr = dto.TitleAr; e.TitleEn = dto.TitleEn; e.Slug = dto.Slug;
        e.ContentAr = dto.ContentAr; e.ContentEn = dto.ContentEn;
        e.PageType = dto.PageType; e.Template = dto.Template;
        e.CoverImageUrl = dto.CoverImageUrl; e.Sections = dto.Sections ?? "[]";
        e.SeoTitle = dto.SeoTitle; e.SeoDescription = dto.SeoDescription;
        e.IsPublished = dto.IsPublished; e.ParentId = dto.ParentId;
        await _repo.UpdateAsync(e);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }

    private static PageDto MapToDto(Page p) => new(
        p.Id, p.TitleAr, p.TitleEn, p.Slug, p.ContentAr, p.ContentEn,
        p.PageType, p.Template, p.CoverImageUrl, p.Sections,
        p.SeoTitle, p.SeoDescription, p.IsPublished, p.SortOrder, p.ParentId);
}

// ========================
// TESTIMONIALS CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly ITestimonialRepository _repo;
    public TestimonialsController(ITestimonialRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestimonialDto>>> GetAll()
        => Ok((await _repo.GetActiveAsync()).Select(MapToDto));

    [HttpGet("admin/all")]
    public async Task<ActionResult<IEnumerable<TestimonialDto>>> GetAllAdmin()
        => Ok((await _repo.GetAllAsync()).Select(MapToDto));

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<TestimonialDto>>> GetFeatured()
        => Ok((await _repo.GetFeaturedAsync()).Select(MapToDto));

    // Public Submit Review Endpoint (Directly from clients without login)
    [HttpPost("submit")]
    public async Task<ActionResult<TestimonialDto>> SubmitPublicReview([FromBody] CreateTestimonialDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.ClientName) || string.IsNullOrWhiteSpace(dto.ContentAr))
            return BadRequest(new { message = "الاسم والرأي مطلوبان" });

        var entity = new Testimonial
        {
            ClientName = dto.ClientName.Trim(),
            ClientPhone = dto.ClientPhone?.Trim(),
            ClientEmail = dto.ClientEmail?.Trim(),
            Country = dto.Country?.Trim() ?? "السعودية",
            City = dto.City?.Trim() ?? "الرياض",
            ClientTitle = dto.ClientTitle?.Trim(),
            ClientUniversity = dto.ClientUniversity?.Trim(),
            ContentAr = dto.ContentAr.Trim(),
            Rating = Math.Clamp(dto.Rating ?? 5, 1, 5),
            ServiceId = dto.ServiceId,
            IsFeatured = false,
            IsActive = true // Automatically active so it appears immediately!
        };
        await _repo.AddAsync(entity);
        return Ok(MapToDto(entity));
    }

    [HttpPost]
    public async Task<ActionResult<TestimonialDto>> Create([FromBody] CreateTestimonialDto dto)
    {
        var entity = new Testimonial
        {
            ClientName = dto.ClientName,
            ClientPhone = dto.ClientPhone,
            ClientEmail = dto.ClientEmail,
            Country = dto.Country,
            City = dto.City,
            ClientTitle = dto.ClientTitle,
            ClientUniversity = dto.ClientUniversity,
            ContentAr = dto.ContentAr,
            ContentEn = dto.ContentEn,
            Rating = dto.Rating,
            ServiceId = dto.ServiceId,
            IsFeatured = dto.IsFeatured
        };
        await _repo.AddAsync(entity);
        return Ok(MapToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CreateTestimonialDto dto)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e == null) return NotFound();
        e.ClientName = dto.ClientName;
        e.ClientPhone = dto.ClientPhone;
        e.ClientEmail = dto.ClientEmail;
        e.Country = dto.Country;
        e.City = dto.City;
        e.ClientTitle = dto.ClientTitle;
        e.ClientUniversity = dto.ClientUniversity;
        e.ContentAr = dto.ContentAr;
        e.ContentEn = dto.ContentEn;
        e.Rating = dto.Rating;
        e.ServiceId = dto.ServiceId;
        e.IsFeatured = dto.IsFeatured;
        await _repo.UpdateAsync(e);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }

    private static TestimonialDto MapToDto(Testimonial t) => new(
        t.Id, t.ClientName, t.ClientTitle,
        t.ClientPhone, t.ClientEmail, t.Country, t.City,
        t.ClientUniversity,
        t.ContentAr, t.ContentEn, t.Rating, t.ServiceId, t.IsFeatured,
        t.Service?.NameAr, t.CreatedAt);
}

// ========================
// STATISTICS CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly IStatisticRepository _repo;
    public StatisticsController(IStatisticRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StatisticDto>>> GetAll([FromQuery] string? section)
    {
        var items = string.IsNullOrEmpty(section)
            ? await _repo.GetActiveAsync()
            : await _repo.GetBySectionAsync(section);
        return Ok(items.Select(s => new StatisticDto(
            s.Id, s.LabelAr, s.LabelEn, s.Value, s.IconSvg, s.SortOrder, s.Section, s.IsActive)));
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateStatisticDto dto)
    {
        await _repo.AddAsync(new Statistic
        {
            LabelAr = dto.LabelAr, LabelEn = dto.LabelEn,
            Value = dto.Value, IconSvg = dto.IconSvg,
            SortOrder = dto.SortOrder, Section = dto.Section
        });
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CreateStatisticDto dto)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e == null) return NotFound();
        e.LabelAr = dto.LabelAr; e.LabelEn = dto.LabelEn; e.Value = dto.Value;
        e.IconSvg = dto.IconSvg; e.SortOrder = dto.SortOrder; e.Section = dto.Section;
        await _repo.UpdateAsync(e);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }
}

// ========================
// FAQS CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class FaqsController : ControllerBase
{
    private readonly IFaqRepository _repo;
    public FaqsController(IFaqRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FaqDto>>> GetAll([FromQuery] Guid? categoryId)
    {
        var items = categoryId.HasValue
            ? await _repo.GetByCategoryAsync(categoryId.Value)
            : await _repo.GetActiveAsync();
        return Ok(items.Select(f => new FaqDto(
            f.Id, f.QuestionAr, f.QuestionEn, f.AnswerAr, f.AnswerEn,
            f.CategoryId, f.SortOrder, f.Category?.NameAr)));
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateFaqDto dto)
    {
        await _repo.AddAsync(new Faq
        {
            QuestionAr = dto.QuestionAr, QuestionEn = dto.QuestionEn,
            AnswerAr = dto.AnswerAr, AnswerEn = dto.AnswerEn,
            CategoryId = dto.CategoryId, SortOrder = dto.SortOrder
        });
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }
}

// ========================
// SETTINGS CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ISiteSettingRepository _repo;
    public SettingsController(ISiteSettingRepository repo) => _repo = repo;

    [HttpGet("public")]
    public async Task<ActionResult<IEnumerable<SiteSettingDto>>> GetPublic()
    {
        var items = await _repo.GetPublicAsync();
        return Ok(items.Select(MapToDto));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SiteSettingDto>>> GetAll()
        => Ok((await _repo.GetAllAsync()).Select(MapToDto));

    [HttpPost]
    public async Task<ActionResult> Upsert([FromBody] UpsertSettingDto dto)
    {
        await _repo.UpsertAsync(dto.Key, dto.Value, dto.ValueType, dto.GroupName);
        return Ok();
    }

    [HttpPut("{key}")]
    public async Task<ActionResult> UpdateByKey(string key, [FromBody] UpdateSettingValueDto dto)
    {
        await _repo.UpsertAsync(key, dto.Value ?? string.Empty, "string", "general");
        return Ok(new { success = true, key, value = dto.Value });
    }

    private static SiteSettingDto MapToDto(SiteSetting s) => new(
        s.Id, s.Key, s.Value, s.ValueType, s.GroupName, s.DescriptionAr, s.IsPublic);
}

// ========================
// MENUS CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class MenusController : ControllerBase
{
    private readonly IMenuRepository _repo;
    public MenusController(IMenuRepository repo) => _repo = repo;

    [HttpGet("{location}")]
    public async Task<ActionResult<MenuDto>> GetByLocation(string location)
    {
        var menu = await _repo.GetWithItemsAsync(location);
        if (menu == null) return NotFound();
        return Ok(new MenuDto(
            menu.Id, menu.Name, menu.Location, menu.IsActive,
            menu.Items.Where(i => i.ParentId == null).Select(MapItemDto)));
    }

    private static MenuItemDto MapItemDto(MenuItem i) => new(
        i.Id, i.MenuId, i.ParentId, i.TitleAr, i.TitleEn,
        i.Url, i.PageId, i.IconSvg, i.Target, i.SortOrder,
        i.Children?.Where(c => c.IsActive).OrderBy(c => c.SortOrder).Select(MapItemDto));
}

// ========================
// SOCIAL LINKS CONTROLLER
// ========================
[ApiController]
[Route("api/social-links")]
public class SocialLinksController : ControllerBase
{
    private readonly ISocialLinkRepository _repo;
    public SocialLinksController(ISocialLinkRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SocialLinkDto>>> GetAll()
    {
        var items = await _repo.GetActiveAsync();
        return Ok(items.Select(s => new SocialLinkDto(
            s.Id, s.Platform, s.Url, s.IconSvg, s.SortOrder, s.IsActive)));
    }

    [Authorize] [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateSocialLinkDto dto)
    {
        await _repo.AddAsync(new SocialLink
        {
            Platform = dto.Platform, Url = dto.Url,
            IconSvg = dto.IconSvg, SortOrder = dto.SortOrder
        });
        return Ok();
    }

    [Authorize] [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }
}

// ========================
// SERVICE REQUESTS CONTROLLER
// ========================
[ApiController]
[Route("api/service-requests")]
public class ServiceRequestsController : ControllerBase
{
    private readonly IServiceRequestRepository _repo;
    private readonly IServiceRepository _serviceRepo;

    public ServiceRequestsController(IServiceRequestRepository repo, IServiceRepository serviceRepo)
    { _repo = repo; _serviceRepo = serviceRepo; }

    [HttpPost]
    public async Task<ActionResult<ServiceRequestDto>> Create([FromBody] CreateServiceRequestDto dto)
    {
        var entity = new ServiceRequest
        {
            ServiceId = dto.ServiceId, ClientName = dto.ClientName,
            ClientPhone = dto.ClientPhone, ClientEmail = dto.ClientEmail,
            Description = dto.Description, Specialization = dto.Specialization,
            University = dto.University, Deadline = dto.Deadline,
            PageCount = dto.PageCount, AdditionalDetails = dto.AdditionalDetails ?? "{}"
        };
        await _repo.AddAsync(entity);
        return Ok(new ServiceRequestDto(
            entity.Id, entity.ServiceId, entity.ClientName,
            entity.ClientPhone, entity.ClientEmail, entity.Description,
            entity.Specialization, entity.University, entity.Deadline,
            entity.PageCount, entity.Status, entity.WhatsappSent, null, entity.CreatedAt));
    }

    [HttpPost("whatsapp")]
    public ActionResult<object> GenerateWhatsApp([FromBody] WhatsAppMessageDto dto)
    {
        var lines = new List<string> { "السلام عليكم 🙏", "أرغب بطلب خدمة من أم رهام:", "" };
        if (!string.IsNullOrEmpty(dto.ServiceName)) lines.Add($"📌 الخدمة: {dto.ServiceName}");
        if (!string.IsNullOrEmpty(dto.Description)) lines.Add($"📝 الوصف: {dto.Description}");
        if (!string.IsNullOrEmpty(dto.Specialization)) lines.Add($"🎓 التخصص: {dto.Specialization}");
        if (!string.IsNullOrEmpty(dto.University)) lines.Add($"🏫 الجامعة: {dto.University}");
        if (dto.PageCount.HasValue) lines.Add($"📄 عدد الصفحات: {dto.PageCount}");
        if (!string.IsNullOrEmpty(dto.Deadline)) lines.Add($"⏰ الموعد: {dto.Deadline}");
        lines.Add(""); lines.Add("شكراً لكم 🌟");

        var message = Uri.EscapeDataString(string.Join("\n", lines));
        return Ok(new { message = string.Join("\n", lines), encodedMessage = message });
    }

    [HttpGet("track")]
    public async Task<ActionResult<ServiceRequestDto>> Track([FromQuery] string? code, [FromQuery] string? phone)
    {
        var query = !string.IsNullOrWhiteSpace(code) ? code : phone;
        if (string.IsNullOrWhiteSpace(query))
            return BadRequest(new { message = "الرجاء إدخال كود الطلب أو رقم الجوال." });

        var r = await _repo.FindByTrackingCodeOrPhoneAsync(query);
        if (r == null) return NotFound(new { message = "لم يتم العثور على أي طلب مطابق." });

        return Ok(new ServiceRequestDto(
            r.Id, r.ServiceId, r.ClientName, r.ClientPhone, r.ClientEmail,
            r.Description, r.Specialization, r.University, r.Deadline,
            r.PageCount, r.Status, r.WhatsappSent, r.Service?.NameAr, r.CreatedAt));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceRequestDto>> GetById(Guid id)
    {
        var r = await _repo.GetByIdAsync(id);
        if (r == null) return NotFound();
        return Ok(new ServiceRequestDto(
            r.Id, r.ServiceId, r.ClientName, r.ClientPhone, r.ClientEmail,
            r.Description, r.Specialization, r.University, r.Deadline,
            r.PageCount, r.Status, r.WhatsappSent, r.Service?.NameAr, r.CreatedAt));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceRequestDto>>> GetAll([FromQuery] string? status)
    {
        var items = string.IsNullOrEmpty(status)
            ? await _repo.GetAllAsync()
            : await _repo.GetByStatusAsync(status);
        return Ok(items.Select(r => new ServiceRequestDto(
            r.Id, r.ServiceId, r.ClientName, r.ClientPhone, r.ClientEmail,
            r.Description, r.Specialization, r.University, r.Deadline,
            r.PageCount, r.Status, r.WhatsappSent, r.Service?.NameAr, r.CreatedAt)));
    }

    [HttpPut("{id}/status")]
    public async Task<ActionResult> UpdateStatus(string id, [FromBody] System.Text.Json.JsonElement body)
    {
        if (!Guid.TryParse(id, out var reqId))
        {
            return BadRequest(new { message = "Invalid request ID" });
        }
        string? status = null;
        if (body.ValueKind == System.Text.Json.JsonValueKind.String)
        {
            status = body.GetString();
        }
        else if (body.ValueKind == System.Text.Json.JsonValueKind.Object && body.TryGetProperty("status", out var prop))
        {
            status = prop.GetString();
        }
        if (!string.IsNullOrEmpty(status))
        {
            await _repo.UpdateStatusAsync(reqId, status);
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}

// ========================
// ARTICLES CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly IArticleRepository _repo;
    public ArticlesController(IArticleRepository repo) => _repo = repo;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArticleDto>>> GetAll([FromQuery] Guid? categoryId)
    {
        var items = categoryId.HasValue
            ? await _repo.GetByCategoryAsync(categoryId.Value)
            : await _repo.GetPublishedAsync();
        return Ok(items.Select(a => new ArticleDto(
            a.Id, a.TitleAr, a.TitleEn, a.Slug, a.ExcerptAr,
            a.CoverImageUrl, a.Author?.FullName, a.Category?.NameAr,
            a.IsPublished, a.PublishAt, a.ViewsCount, a.CreatedAt)));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ArticleDetailDto>> GetBySlug(string slug)
    {
        var a = await _repo.GetBySlugAsync(slug);
        if (a == null || !a.IsPublished) return NotFound();
        await _repo.IncrementViewsAsync(a.Id);
        return Ok(new ArticleDetailDto(
            a.Id, a.TitleAr, a.TitleEn, a.Slug, a.ExcerptAr,
            a.ContentAr, a.ContentEn, a.CoverImageUrl, a.Tags,
            a.Author?.FullName, a.Category?.NameAr,
            a.SeoTitle, a.SeoDescription, a.PublishAt, a.ViewsCount, a.CreatedAt));
    }

    [Authorize] [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateArticleDto dto)
    {
        await _repo.AddAsync(new Article
        {
            TitleAr = dto.TitleAr, TitleEn = dto.TitleEn, Slug = dto.Slug,
            ExcerptAr = dto.ExcerptAr, ContentAr = dto.ContentAr, ContentEn = dto.ContentEn,
            CoverImageUrl = dto.CoverImageUrl, Tags = dto.Tags ?? "[]",
            CategoryId = dto.CategoryId, IsPublished = dto.IsPublished,
            SeoTitle = dto.SeoTitle, SeoDescription = dto.SeoDescription,
            PublishAt = dto.IsPublished ? DateTime.UtcNow : null
        });
        return Ok();
    }

    [Authorize] [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id) { await _repo.DeleteAsync(id); return NoContent(); }
}

// ========================
// AGENT CONTROLLER (سعود وفرح)
// ========================
[ApiController]
[Route("api/[controller]")]
public class AgentController : ControllerBase
{
    private readonly IAgentResponseRepository _responseRepo;
    private readonly IAgentConversationRepository _conversationRepo;

    public AgentController(IAgentResponseRepository responseRepo, IAgentConversationRepository conversationRepo)
    { _responseRepo = responseRepo; _conversationRepo = conversationRepo; }

    [HttpPost("message")]
    public async Task<ActionResult<AgentResponseDto>> SendMessage([FromBody] AgentMessageDto dto)
    {
        var agentType = dto.AgentType?.ToLower() ?? "saud";
        var sessionId = dto.SessionId ?? Guid.NewGuid().ToString();

        // Try to find matching response by keywords
        var response = await _responseRepo.FindByKeywordsAsync(agentType, dto.Message);

        if (response == null)
        {
            // Default response
            var defaultMsg = agentType == "saud"
                ? "أهلاً! وش أقدر أساعدك فيه؟ 😊"
                : "أهلاً! خلّيني أساعدك تلاقي الخدمة المناسبة 📚";

            return Ok(new AgentResponseDto(
                agentType, defaultMsg, "happy",
                null, sessionId, "general"));
        }

        // Parse follow-up options
        List<AgentFollowUpOption>? followUps = null;
        try
        {
            followUps = System.Text.Json.JsonSerializer.Deserialize<List<AgentFollowUpOption>>(
                response.FollowUpOptions,
                new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        catch { /* ignore parsing errors */ }

        return Ok(new AgentResponseDto(
            agentType, response.ResponseAr, response.Expression,
            followUps, sessionId, response.Intent));
    }

    [HttpGet("responses/{agentType}")]
    public async Task<ActionResult<IEnumerable<object>>> GetResponses(string agentType)
    {
        var responses = await _responseRepo.GetByAgentTypeAsync(agentType);
        return Ok(responses);
    }
}

// ========================
// MEDIA CONTROLLER
// ========================
[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IMediaRepository _repo;
    private readonly IWebHostEnvironment _env;

    public MediaController(IMediaRepository repo, IWebHostEnvironment env)
    { _repo = repo; _env = env; }

    [HttpPost("upload")]
    public async Task<ActionResult<MediaDto>> Upload(IFormFile file, [FromQuery] string folder = "general")
    {
        if (file == null || file.Length == 0) return BadRequest(new { message = "No file uploaded" });

        var rootPath = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
        var uploadsPath = Path.Combine(rootPath, "uploads", folder);
        Directory.CreateDirectory(uploadsPath);

        var ext = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await file.CopyToAsync(stream);

        var media = new Media
        {
            Filename = fileName,
            OriginalFilename = file.FileName,
            MimeType = file.ContentType,
            FileSize = file.Length,
            FilePath = $"/uploads/{folder}/{fileName}",
            Folder = folder
        };
        await _repo.AddAsync(media);

        return Ok(new MediaDto(
            media.Id, media.Filename, media.OriginalFilename,
            media.MimeType, media.FileSize, media.FilePath,
            media.ThumbnailPath, media.AltTextAr, media.AltTextEn,
            media.Folder, media.CreatedAt));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MediaDto>>> GetAll([FromQuery] string? folder)
    {
        var items = string.IsNullOrEmpty(folder)
            ? await _repo.GetAllAsync()
            : await _repo.GetByFolderAsync(folder);
        return Ok(items.Select(m => new MediaDto(
            m.Id, m.Filename, m.OriginalFilename, m.MimeType,
            m.FileSize, m.FilePath, m.ThumbnailPath,
            m.AltTextAr, m.AltTextEn, m.Folder, m.CreatedAt)));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var media = await _repo.GetByIdAsync(id);
        if (media != null)
        {
            var rootPath = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var fullPath = Path.Combine(rootPath, media.FilePath.TrimStart('/'));
            if (System.IO.File.Exists(fullPath)) System.IO.File.Delete(fullPath);
            await _repo.DeleteAsync(id);
        }
        return NoContent();
    }
}
