using System.ComponentModel.DataAnnotations;

namespace UmmReham.Domain.Entities;

public class Faq : BaseEntity
{
    [Required]
    public string QuestionAr { get; set; } = string.Empty;

    public string? QuestionEn { get; set; }

    [Required]
    public string AnswerAr { get; set; } = string.Empty;

    public string? AnswerEn { get; set; }

    public Guid? CategoryId { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Category? Category { get; set; }
}
