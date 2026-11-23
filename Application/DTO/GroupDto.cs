using AskDate.Domain.Entities;

namespace AskDate.Application.DTO;

public class GroupDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string InviteLink { get; set; } = string.Empty;
    public int CreatorProfileId { get; set; }
    public List<ParticipantDto> Participants { get; set; } = new();
}

public class GroupCreateDto
{
    public string Name { get; set; } = string.Empty;
}

public class GroupUpdateDto
{
    public string Name { get; set; } = string.Empty;
}

public class ParticipantDto
{
    public int ProfileId { get; set; }
    public string ProfileName { get; set; } = string.Empty;
    public ParticipantRole Role { get; set; }

    /// <summary>Free = marks mean available days; Busy = marks mean unavailable days.</summary>
    public int AvailabilityMode { get; set; }
}

public class AvailabilityModeDto
{
    public int AvailabilityMode { get; set; }
}
