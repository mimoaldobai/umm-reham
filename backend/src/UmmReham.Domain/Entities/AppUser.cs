using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class AppUser : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? FullName { get; set; }

    [MaxLength(50)]
    public string Role { get; set; } = "admin"; // super_admin, admin, editor

    public string? AvatarUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAt { get; set; }

    // Navigation
    public ICollection<Article> Articles { get; set; } = new List<Article>();
}
