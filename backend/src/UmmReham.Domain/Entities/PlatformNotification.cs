using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class PlatformNotification : BaseEntity
{
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Type { get; set; } = "general"; // order_status, broadcast, discount, welcome, new_order, new_client, new_inquiry

    [MaxLength(100)]
    public string Target { get; set; } = "all"; // 'all' or specific clientId

    [MaxLength(50)]
    public string? Icon { get; set; } = "🔔";

    [MaxLength(500)]
    public string? Link { get; set; }

    [MaxLength(100)]
    public string? ActionLabel { get; set; }

    public bool IsRead { get; set; }

    [MaxLength(50)]
    public string RecipientType { get; set; } = "client"; // "client" or "admin"
}
