using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class AgentConversation : BaseEntity
{
    [Required]
    [MaxLength(255)]
    public string SessionId { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string AgentType { get; set; } = string.Empty; // saud, farah

    public string Messages { get; set; } = "[]"; // JSONB array of messages

    [MaxLength(100)]
    public string? Intent { get; set; }

    public Guid? DetectedServiceId { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "active";

    public string Metadata { get; set; } = "{}";

    // Navigation
    public Service? DetectedService { get; set; }
}

public class AgentResponse : BaseEntity
{
    [Required]
    [MaxLength(20)]
    public string AgentType { get; set; } = string.Empty; // saud, farah

    [Required]
    [MaxLength(100)]
    public string Intent { get; set; } = string.Empty;

    public string TriggerKeywords { get; set; } = "[]"; // JSONB

    [Required]
    public string ResponseAr { get; set; } = string.Empty;

    public string? ResponseEn { get; set; }
    public string FollowUpOptions { get; set; } = "[]"; // JSONB

    [MaxLength(50)]
    public string? Expression { get; set; } // happy, thinking, explaining, etc.

    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
