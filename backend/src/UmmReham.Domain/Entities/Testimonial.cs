using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Testimonial : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string ClientName { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? ClientTitle { get; set; }

    [MaxLength(50)]
    public string? ClientPhone { get; set; }

    [MaxLength(255)]
    public string? ClientEmail { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    [MaxLength(255)]
    public string? ClientUniversity { get; set; }

    [Required]
    public string ContentAr { get; set; } = string.Empty;

    public string? ContentEn { get; set; }

    public int? Rating { get; set; }
    public Guid? ServiceId { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }

    // Navigation
    public Service? Service { get; set; }
}
