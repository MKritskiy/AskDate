namespace AskDate.Application.DTO;

public class NoteDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Title { get; set; }
    public int GroupId { get; set; }
    public int CreatorProfileId { get; set; }
    public string CreatorName { get; set; } = string.Empty;
    public List<int> ConfirmedProfileIds { get; set; } = new();
    public List<string> ConfirmedProfileNames { get; set; } = new();

    // Recurrence
    public string RecurrenceType { get; set; } = "none";
    public int RecurrenceInterval { get; set; } = 1;
    public DateTime? RecurrenceEndDate { get; set; }
    public int? RecurrenceCount { get; set; }
    public string? RecurrenceDaysOfWeek { get; set; }
    public int? ParentNoteId { get; set; }
    public bool IsRecurringInstance => ParentNoteId.HasValue;
    public bool IsVirtual { get; set; } = false;
}

public class NoteCreateDto
{
    public DateTime Date { get; set; }
    public string? Title { get; set; }

    // Recurrence settings (optional)
    public string? RecurrenceType { get; set; }
    public int RecurrenceInterval { get; set; } = 1;
    public DateTime? RecurrenceEndDate { get; set; }
    public int? RecurrenceCount { get; set; }
    public string? RecurrenceDaysOfWeek { get; set; }
}

public class UpdateTitleDto
{
    public string? Title { get; set; }
}
