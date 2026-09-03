using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Menu : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Location { get; set; } = string.Empty; // header, footer, sidebar

    public bool IsActive { get; set; } = true;

    public ICollection<MenuItem> Items { get; set; } = new List<MenuItem>();
}

public class MenuItem : BaseEntity
{
    public Guid MenuId { get; set; }
    public Guid? ParentId { get; set; }

    [Required]
    [MaxLength(255)]
    public string TitleAr { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? TitleEn { get; set; }

    [MaxLength(500)]
    public string? Url { get; set; }

    public Guid? PageId { get; set; }
    public string? IconSvg { get; set; }

    [MaxLength(20)]
    public string Target { get; set; } = "_self";

    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public string Metadata { get; set; } = "{}";

    // Navigation
    public Menu Menu { get; set; } = null!;
    public MenuItem? Parent { get; set; }
    public Page? Page { get; set; }
    public ICollection<MenuItem> Children { get; set; } = new List<MenuItem>();
}
