using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class PortfolioItem : BaseEntity
{
    public Guid? ServiceId { get; set; }
    public Guid? CategoryId { get; set; }

    [Required]
    [MaxLength(255)]
    public string TitleAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? TitleEn { get; set; }

    public string? DescriptionAr { get; set; }
    public string? DescriptionEn { get; set; }

    [MaxLength(255)]
    public string? ClientName { get; set; }

    [MaxLength(255)]
    public string? University { get; set; }

    [MaxLength(255)]
    public string? Specialization { get; set; }

    [MaxLength(255)]
    public string? Degree { get; set; }

    public string? CoverImageUrl { get; set; }
    public string? FileUrl { get; set; }
    public string? VideoUrl { get; set; }
    public string GalleryImages { get; set; } = "[]";
    public string Files { get; set; } = "[]";
    public string Tags { get; set; } = "[]";
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? CompletedAt { get; set; }
    public string Metadata { get; set; } = "{}";

    // Navigation
    public Service? Service { get; set; }
    public Category? Category { get; set; }
}
