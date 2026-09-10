namespace UmmReham.Application.DTOs;

// ========================
// CATEGORY DTOs
// ========================
public record CategoryDto(
    Guid Id, string NameAr, string? NameEn, string Slug,
    string? DescriptionAr, string? DescriptionEn, string? IconSvg,
    string? CoverImageUrl, int SortOrder, bool IsActive, DateTime CreatedAt);

public record CategoryWithServicesDto(
    Guid Id, string NameAr, string? NameEn, string Slug,
    string? DescriptionAr, string? DescriptionEn, string? IconSvg,
    string? CoverImageUrl, int SortOrder,
    IEnumerable<ServiceDto> Services);

public record CreateCategoryDto(
    string NameAr, string? NameEn, string Slug,
    string? DescriptionAr, string? DescriptionEn,
    string? IconSvg, string? CoverImageUrl, int SortOrder = 0);

public record UpdateCategoryDto(
    string NameAr, string? NameEn, string Slug,
    string? DescriptionAr, string? DescriptionEn,
    string? IconSvg, string? CoverImageUrl, int SortOrder, bool IsActive);

// ========================
// SERVICE DTOs
// ========================
public record ServiceDto(
    Guid Id, Guid? CategoryId, string NameAr, string? NameEn, string Slug,
    string? ShortDescriptionAr, string? ShortDescriptionEn,
    string? IconSvg, string? CoverImageUrl, string PriceType,
    decimal? PriceMin, decimal? PriceMax, string PriceCurrency,
    string? EstimatedDuration, int SortOrder, bool IsActive, bool IsFeatured,
    string? CategoryNameAr, DateTime CreatedAt, string? AvailableOptions = null);

public record ServiceDetailDto(
    Guid Id, Guid? CategoryId, string NameAr, string? NameEn, string Slug,
    string? ShortDescriptionAr, string? ShortDescriptionEn,
    string? FullDescriptionAr, string? FullDescriptionEn,
    string? TargetAudienceAr, string? RequirementsAr,
    string? AvailableOptions, string? IconSvg, string? CoverImageUrl,
    string? GalleryImages, string PriceType,
    decimal? PriceMin, decimal? PriceMax, string PriceCurrency,
    string? EstimatedDuration, bool IsFeatured,
    string? SeoTitle, string? SeoDescription,
    string? CategoryNameAr,
    IEnumerable<PortfolioItemDto>? PortfolioItems,
    IEnumerable<TestimonialDto>? Testimonials);

public record CreateServiceDto(
    Guid? CategoryId, string NameAr, string? NameEn, string Slug,
    string? ShortDescriptionAr, string? ShortDescriptionEn,
    string? FullDescriptionAr, string? FullDescriptionEn,
    string? TargetAudienceAr, string? RequirementsAr,
    string? AvailableOptions, string PriceType,
    decimal? PriceMin, decimal? PriceMax, string PriceCurrency,
    string? EstimatedDuration, string? IconSvg, string? CoverImageUrl,
    string? GalleryImages, int SortOrder = 0, bool IsFeatured = false,
    string? SeoTitle = null, string? SeoDescription = null);

public record UpdateServiceDto(
    Guid? CategoryId, string NameAr, string? NameEn, string Slug,
    string? ShortDescriptionAr, string? ShortDescriptionEn,
    string? FullDescriptionAr, string? FullDescriptionEn,
    string? TargetAudienceAr, string? RequirementsAr,
    string? AvailableOptions, string PriceType,
    decimal? PriceMin, decimal? PriceMax, string PriceCurrency,
    string? EstimatedDuration, string? IconSvg, string? CoverImageUrl,
    string? GalleryImages, int SortOrder, bool IsActive, bool IsFeatured,
    string? SeoTitle, string? SeoDescription);

// ========================
// PORTFOLIO DTOs
// ========================
public record PortfolioItemDto(
    Guid Id, Guid? ServiceId, Guid? CategoryId,
    string TitleAr, string? TitleEn,
    string? DescriptionAr, string? DescriptionEn,
    string? ClientName, string? University, string? Specialization, string? Degree,
    string? CoverImageUrl, string? FileUrl, string? VideoUrl,
    string? GalleryImages, string? Tags,
    bool IsFeatured, bool IsActive, DateTime? CompletedAt,
    string? ServiceNameAr, string? CategoryNameAr);

public record CreatePortfolioItemDto(
    Guid? ServiceId, Guid? CategoryId,
    string TitleAr, string? TitleEn,
    string? DescriptionAr, string? DescriptionEn,
    string? ClientName, string? University, string? Specialization, string? Degree,
    string? CoverImageUrl, string? FileUrl, string? VideoUrl,
    string? GalleryImages, string? Tags,
    bool IsFeatured = false, bool IsActive = true, DateTime? CompletedAt = null);

// ========================
// PAGE DTOs
// ========================
public record PageDto(
    Guid Id, string TitleAr, string? TitleEn, string Slug,
    string? ContentAr, string? ContentEn,
    string PageType, string Template,
    string? CoverImageUrl, string? Sections,
    string? SeoTitle, string? SeoDescription,
    bool IsPublished, int SortOrder, Guid? ParentId);

public record CreatePageDto(
    string TitleAr, string? TitleEn, string Slug,
    string? ContentAr, string? ContentEn,
    string PageType, string Template,
    string? CoverImageUrl, string? Sections,
    string? SeoTitle, string? SeoDescription,
    bool IsPublished = false, Guid? ParentId = null);

// ========================
// TESTIMONIAL DTOs
// ========================
public record TestimonialDto(
    Guid Id, string ClientName, string? ClientTitle,
    string? ClientPhone, string? ClientEmail, string? Country, string? City,
    string? ClientUniversity, string ContentAr, string? ContentEn,
    int? Rating, Guid? ServiceId, bool IsFeatured,
    string? ServiceNameAr, DateTime CreatedAt);

public record CreateTestimonialDto(
    string ClientName = "",
    string? ClientTitle = null,
    string? ClientPhone = null,
    string? ClientEmail = null,
    string? Country = "السعودية",
    string? City = "الرياض",
    string? ClientUniversity = null,
    string ContentAr = "",
    string? ContentEn = null,
    int? Rating = 5,
    Guid? ServiceId = null,
    bool IsFeatured = false);

// ========================
// STATISTIC DTOs
// ========================
public record StatisticDto(
    Guid Id, string LabelAr, string? LabelEn,
    string Value, string? IconSvg, int SortOrder,
    string Section, bool IsActive);

public record CreateStatisticDto(
    string LabelAr, string? LabelEn,
    string Value, string? IconSvg, int SortOrder = 0,
    string Section = "hero");

// ========================
// FAQ DTOs
// ========================
public record FaqDto(
    Guid Id, string QuestionAr, string? QuestionEn,
    string AnswerAr, string? AnswerEn,
    Guid? CategoryId, int SortOrder, string? CategoryNameAr);

public record CreateFaqDto(
    string QuestionAr, string? QuestionEn,
    string AnswerAr, string? AnswerEn,
    Guid? CategoryId, int SortOrder = 0);

// ========================
// ARTICLE DTOs
// ========================
public record ArticleDto(
    Guid Id, string TitleAr, string? TitleEn, string Slug,
    string? ExcerptAr, string? CoverImageUrl,
    string? AuthorName, string? CategoryNameAr,
    bool IsPublished, DateTime? PublishAt, int ViewsCount,
    DateTime CreatedAt);

public record ArticleDetailDto(
    Guid Id, string TitleAr, string? TitleEn, string Slug,
    string? ExcerptAr, string ContentAr, string? ContentEn,
    string? CoverImageUrl, string? Tags,
    string? AuthorName, string? CategoryNameAr,
    string? SeoTitle, string? SeoDescription,
    DateTime? PublishAt, int ViewsCount, DateTime CreatedAt);

public record CreateArticleDto(
    string TitleAr, string? TitleEn, string Slug,
    string? ExcerptAr, string ContentAr, string? ContentEn,
    string? CoverImageUrl, string? Tags,
    Guid? CategoryId, bool IsPublished = false,
    string? SeoTitle = null, string? SeoDescription = null);

// ========================
// MENU DTOs
// ========================
public record MenuDto(
    Guid Id, string Name, string Location, bool IsActive,
    IEnumerable<MenuItemDto>? Items);

public record MenuItemDto(
    Guid Id, Guid MenuId, Guid? ParentId,
    string TitleAr, string? TitleEn, string? Url,
    Guid? PageId, string? IconSvg, string Target,
    int SortOrder, IEnumerable<MenuItemDto>? Children);

// ========================
// MEDIA DTOs
// ========================
public record MediaDto(
    Guid Id, string Filename, string? OriginalFilename,
    string? MimeType, long FileSize, string FilePath,
    string? ThumbnailPath, string? AltTextAr, string? AltTextEn,
    string Folder, DateTime CreatedAt);

// ========================
// SOCIAL LINK DTOs
// ========================
public record SocialLinkDto(
    Guid Id, string Platform, string Url,
    string? IconSvg, int SortOrder, bool IsActive);

public record CreateSocialLinkDto(
    string Platform, string Url, string? IconSvg, int SortOrder = 0);

// ========================
// SITE SETTING DTOs
// ========================
public record SiteSettingDto(
    Guid Id, string Key, string? Value, string ValueType,
    string GroupName, string? DescriptionAr, bool IsPublic);

public record UpsertSettingDto(string Key, string Value, string ValueType = "text", string GroupName = "general");
public record UpdateSettingValueDto(string? Value);

// ========================
// SERVICE REQUEST DTOs
// ========================
public record ServiceRequestDto(
    Guid Id, Guid? ServiceId, string? ClientName,
    string? ClientPhone, string? ClientEmail,
    string? Description, string? Specialization,
    string? University, DateTime? Deadline, int? PageCount,
    string Status, bool WhatsappSent,
    string? ServiceNameAr, DateTime CreatedAt);

public record CreateServiceRequestDto(
    Guid? ServiceId, string? ClientName,
    string? ClientPhone, string? ClientEmail,
    string? Description, string? Specialization,
    string? University, DateTime? Deadline, int? PageCount,
    string? AdditionalDetails);

// ========================
// AGENT DTOs
// ========================
public record AgentMessageDto(
    string AgentType, string Message, string? SessionId);

public record AgentResponseDto(
    string AgentType, string ResponseAr, string? Expression,
    IEnumerable<AgentFollowUpOption>? FollowUpOptions,
    string SessionId, string? DetectedIntent);

public record AgentFollowUpOption(string Label, string Value, string? Icon);

// ========================
// AUTH & USER MANAGEMENT DTOs
// ========================
public record LoginDto(string Username, string Password);
public record LoginResponseDto(string Token, string Username, string FullName, string Role, DateTime ExpiresAt);
public record UserDto(
    Guid Id, string Username, string Email, string? FullName,
    string Role, string? AvatarUrl, bool IsActive, DateTime? LastLoginAt, DateTime CreatedAt);
public record CreateUserDto(
    string Username, string Email, string Password, string? FullName,
    string Role = "consultant", bool IsActive = true);
public record UpdateUserDto(
    string Username, string Email, string? Password, string? FullName,
    string Role, bool IsActive);

// ========================
// WHATSAPP DTOs
// ========================
public record WhatsAppMessageDto(
    Guid? ServiceId, string? ServiceName,
    string? Description, string? Specialization,
    string? University, int? PageCount, string? Deadline);
