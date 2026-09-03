using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Article : BaseEntity
{
    [Required]
    [MaxLength(500)]
    public string TitleAr { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? TitleEn { get; set; }

    [Required]
    [MaxLength(500)]
    public string Slug { get; set; } = string.Empty;

    public string? ExcerptAr { get; set; }

    [Required]
    public string ContentAr { get; set; } = string.Empty;

    public string? ContentEn { get; set; }
    public string? CoverImageUrl { get; set; }
    public Guid? AuthorId { get; set; }
    public Guid? CategoryId { get; set; }
    public string Tags { get; set; } = "[]"; // JSONB
    public bool IsPublished { get; set; }
    public DateTime? PublishAt { get; set; }
    public int ViewsCount { get; set; }

    [MaxLength(255)]
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }

    // Navigation
    public AppUser? Author { get; set; }
    public Category? Category { get; set; }
}

public class SocialLink : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string Platform { get; set; } = string.Empty;

    [Required]
    public string Url { get; set; } = string.Empty;

    public string? IconSvg { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
