using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Category : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string NameAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? NameEn { get; set; }

    [Required]
    [MaxLength(255)]
    public string Slug { get; set; } = string.Empty;

    public string? DescriptionAr { get; set; }
    public string? DescriptionEn { get; set; }
    public string? IconSvg { get; set; }
    public string? CoverImageUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public string Metadata { get; set; } = "{}";

    // Navigation
    public ICollection<Service> Services { get; set; } = new List<Service>();
    public ICollection<PortfolioItem> PortfolioItems { get; set; } = new List<PortfolioItem>();
    public ICollection<Faq> Faqs { get; set; } = new List<Faq>();
    public ICollection<Article> Articles { get; set; } = new List<Article>();
}
