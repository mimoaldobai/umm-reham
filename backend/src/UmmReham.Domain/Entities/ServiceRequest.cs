using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class ServiceRequest : BaseEntity
{
    public Guid? ServiceId { get; set; }

    [MaxLength(255)]
    public string? ClientName { get; set; }

    [MaxLength(50)]
    public string? ClientPhone { get; set; }

    [MaxLength(255)]
    public string? ClientEmail { get; set; }

    public string? Description { get; set; }
    public string Files { get; set; } = "[]"; // JSONB

    [MaxLength(255)]
    public string? Specialization { get; set; }

    [MaxLength(255)]
    public string? University { get; set; }

    public DateTime? Deadline { get; set; }
    public int? PageCount { get; set; }
    public string AdditionalDetails { get; set; } = "{}"; // JSONB

    [MaxLength(50)]
    public string Status { get; set; } = "new"; // new, in_progress, completed, cancelled

    public bool WhatsappSent { get; set; }

    // Navigation
    public Service? Service { get; set; }
}
