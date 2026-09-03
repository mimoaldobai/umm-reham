using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Media : BaseEntity
{
    [Required]
    [MaxLength(500)]
    public string Filename { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? OriginalFilename { get; set; }

    [MaxLength(100)]
    public string? MimeType { get; set; }

    public long FileSize { get; set; }

    [Required]
    public string FilePath { get; set; } = string.Empty;

    public string? ThumbnailPath { get; set; }

    [MaxLength(255)]
    public string? AltTextAr { get; set; }

    [MaxLength(255)]
    public string? AltTextEn { get; set; }

    [MaxLength(255)]
    public string Folder { get; set; } = "general";

    public string? Dimensions { get; set; } // JSONB: { width, height }
    public string Metadata { get; set; } = "{}";
    public Guid? UploadedBy { get; set; }
}
