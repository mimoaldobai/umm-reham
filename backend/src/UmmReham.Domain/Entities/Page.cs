using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Page : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string TitleAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? TitleEn { get; set; }

    [Required]
    [MaxLength(255)]
    public string Slug { get; set; } = string.Empty;

    public string? ContentAr { get; set; }
    public string? ContentEn { get; set; }

    [MaxLength(50)]
    public string PageType { get; set; } = "custom"; // home, about, contact, custom

    [MaxLength(100)]
    public string Template { get; set; } = "default";

    public string? CoverImageUrl { get; set; }
    public string Sections { get; set; } = "[]"; // Dynamic sections JSONB

    [MaxLength(255)]
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public bool IsPublished { get; set; }
    public DateTime? PublishAt { get; set; }
    public int SortOrder { get; set; }
    public Guid? ParentId { get; set; }
    public string Metadata { get; set; } = "{}";

    // Navigation
    public Page? Parent { get; set; }
    public ICollection<Page> Children { get; set; } = new List<Page>();
}
