using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Service : BaseEntity
{
    public Guid? CategoryId { get; set; }

    [Required]
    [MaxLength(255)]
    public string NameAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? NameEn { get; set; }

    [Required]
    [MaxLength(255)]
    public string Slug { get; set; } = string.Empty;

    public string? ShortDescriptionAr { get; set; }
    public string? ShortDescriptionEn { get; set; }
    public string? FullDescriptionAr { get; set; }
    public string? FullDescriptionEn { get; set; }
    public string? TargetAudienceAr { get; set; }
    public string? RequirementsAr { get; set; }
    public string AvailableOptions { get; set; } = "[]";
    
    [MaxLength(50)]
    public string PriceType { get; set; } = "quote"; // fixed, range, quote, contact
    
    public decimal? PriceMin { get; set; }
    public decimal? PriceMax { get; set; }
    
    [MaxLength(10)]
    public string PriceCurrency { get; set; } = "SAR";
    
    [MaxLength(100)]
    public string? EstimatedDuration { get; set; }

    public string? IconSvg { get; set; }
    public string? CoverImageUrl { get; set; }
    public string GalleryImages { get; set; } = "[]";
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; }

    [MaxLength(255)]
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string Metadata { get; set; } = "{}";

    // Navigation
    public Category? Category { get; set; }
    public ICollection<PortfolioItem> PortfolioItems { get; set; } = new List<PortfolioItem>();
    public ICollection<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
    public ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
}
