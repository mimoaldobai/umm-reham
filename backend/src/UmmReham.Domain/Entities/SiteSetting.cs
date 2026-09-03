using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class SiteSetting : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Key { get; set; } = string.Empty;

    public string? Value { get; set; }

    [MaxLength(50)]
    public string ValueType { get; set; } = "text"; // text, number, boolean, json, image

    [MaxLength(100)]
    public string GroupName { get; set; } = "general";

    [MaxLength(500)]
    public string? DescriptionAr { get; set; }

    public bool IsPublic { get; set; } = true;
}

public class Statistic : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string LabelAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? LabelEn { get; set; }

    [Required]
    [MaxLength(100)]
    public string Value { get; set; } = string.Empty;

    public string? IconSvg { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;

    [MaxLength(100)]
    public string Section { get; set; } = "hero"; // hero, trust, about

    public string Metadata { get; set; } = "{}";
}
