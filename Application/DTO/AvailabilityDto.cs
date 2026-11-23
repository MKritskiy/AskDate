using AskDate.Domain.Entities;

namespace AskDate.Application.DTO;

public class AvailabilityMarkDto
{
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public DateOnly Date { get; set; }
    public AvailabilityType Type { get; set; }

    /// <summary>"HH:mm"; null for a whole-day mark.</summary>
    public string? StartTime { get; set; }
    public string? EndTime { get; set; }
}

public class SetAvailabilityDto
{
    public List<string> Dates { get; set; } = new();
    public AvailabilityType Type { get; set; }

    /// <summary>"HH:mm"; both null (or omitted) for a whole-day mark.</summary>
    public string? StartTime { get; set; }
    public string? EndTime { get; set; }

    /// <summary>Own marks to remove in the same operation (used to edit a mark without a gap).</summary>
    public List<int>? ReplaceIds { get; set; }
}

public class RemoveAvailabilityDto
{
    /// <summary>Ids of own marks. When present, <see cref="Dates"/> is ignored.</summary>
    public List<int>? Ids { get; set; }

    /// <summary>Remove every own mark on these days.</summary>
    public List<string>? Dates { get; set; }
}

public class UnmarkedDaysFreeDto
{
    public bool UnmarkedDaysFree { get; set; }
}

public class JoinGroupDto
{
    public string? InviteLink { get; set; }
}
