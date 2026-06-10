namespace AskDate.Domain.Entities;

public enum RecurrenceType
{
    None = 0,
    Daily = 1,
    Weekly = 2,
    Monthly = 3
}

public class Note : BaseEntity
{
    public DateTime Date { get; set; }
    public string? Title { get; set; }
    public int GroupId { get; set; }

    public int CreatorProfileId { get; set; }

    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<NoteConfirmation> Confirmations { get; set; } = new List<NoteConfirmation>();

    // Recurrence fields
    public RecurrenceType RecurrenceType { get; set; } = RecurrenceType.None;
    public int RecurrenceInterval { get; set; } = 1;
    public DateTime? RecurrenceEndDate { get; set; }
    public int? RecurrenceCount { get; set; }
    /// <summary>
    /// For weekly recurrence: comma-separated day numbers (1=Mon, 7=Sun). E.g. "4" = every Thursday.
    /// </summary>
    public string? RecurrenceDaysOfWeek { get; set; }
    /// <summary>
    /// For generated instances: points to the parent recurring note. Null for standalone or parent notes.
    /// </summary>
    public int? ParentNoteId { get; set; }
}