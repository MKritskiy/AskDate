using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;

namespace AskDate.Application.Services;

public class GroupService(
    IGroupRepository groupRepository,
    IParticipantRepository participantRepository,
    IProfileApiClient profileApiClient,
    IRealtimeNotifier realtimeNotifier) : IGroupService
{
    private async Task<GroupDto> MapWithNames(AskDate.Domain.Entities.Group group)
    {
        var dto = Map(group);

        var profileIds = dto.Participants.Select(p => p.ProfileId).Distinct();
        var names = await profileApiClient.GetProfileNamesAsync(profileIds);

        foreach (var p in dto.Participants)
        {
            p.ProfileName = names.GetValueOrDefault(p.ProfileId, "Unknown");
        }

        return dto;
    }

    public async Task<List<GroupDto>> GetAllAsync(int profileId)
    {
        // Filter groups in the database instead of loading everything
        var groups = await groupRepository.Get(
            g => g.Participants.Any(p => p.ProfileId == profileId),
            includeProperties: "Participants");

        var dtos = new List<GroupDto>();
        foreach (var g in groups)
        {
            dtos.Add(await MapWithNames(g));
        }
        return dtos;
    }

    public async Task<GroupDto> GetByIdAsync(int id)
    {
        var group = await groupRepository.GetByIdAsync("Participants", id);
        if (group == null) throw new Exception("Group not found");
        return await MapWithNames(group);
    }

    public async Task<GroupDto> GetByInviteLinkAsync(string link)
    {
        var group = await groupRepository.GetByInviteLinkAsync(link);
        if (group == null) throw new Exception("Group not found");
        return await MapWithNames(group);
    }

    public async Task<GroupDto> CreateAsync(GroupCreateDto dto, int creatorProfileId)
    {
        var group = new AskDate.Domain.Entities.Group
        {
            Name = dto.Name,
            CreatorProfileId = creatorProfileId,
            InviteLink = Guid.NewGuid().ToString("N")
        };

        group.Participants.Add(new Participant { ProfileId = creatorProfileId, Role = ParticipantRole.Creator });

        await groupRepository.AddAsync(group);
        return Map(group);
    }

    public async Task<GroupDto> UpdateAsync(int id, GroupUpdateDto dto)
    {
        var group = await groupRepository.GetByIdAsync("Participants", id);
        if (group == null) throw new Exception("Group not found");

        group.Name = dto.Name;
        await groupRepository.UpdateAsync(group);

        await realtimeNotifier.NotifyGroupUpdatedAsync(id);
        return Map(group);
    }

    public async Task DeleteAsync(int id, int currentProfileId)
    {
        var group = await groupRepository.GetByIdAsync(id);
        if (group?.CreatorProfileId == currentProfileId)
        {
            await groupRepository.DeleteByIdAsync(id);
            await realtimeNotifier.NotifyGroupUpdatedAsync(id, deleted: true);
        }
    }

    public async Task AddParticipantAsync(int groupId, int profileId)
    {
        var group = await groupRepository.GetByIdAsync("Participants", groupId);
        if (group == null) throw new Exception("Group not found");

        if (group.Participants.Any(p => p.ProfileId == profileId)) return;

        var participant = new Participant { GroupId = groupId, ProfileId = profileId, Role = ParticipantRole.Member };
        await participantRepository.AddAsync(participant);
        await realtimeNotifier.NotifyParticipantsChangedAsync(groupId);
    }

    public async Task RemoveParticipantAsync(int groupId, int profileId, int currentProfileId)
    {
        var group = await groupRepository.GetByIdAsync(groupId);
        if (group == null) return;

        // Non-creators can only remove themselves
        if (group.CreatorProfileId != currentProfileId && profileId != currentProfileId) return;

        var participants = await participantRepository.Get(p => p.GroupId == groupId && p.ProfileId == profileId);
        var p = participants.FirstOrDefault();
        if (p != null)
        {
            await participantRepository.DeleteByIdAsync(p.Id);
            await realtimeNotifier.NotifyParticipantsChangedAsync(groupId);
        }
    }

    public async Task SetAvailabilityModeAsync(int groupId, int profileId, int mode)
    {
        if (mode is not ((int)AvailabilityMode.Free) and not ((int)AvailabilityMode.Busy))
            throw new ArgumentException("Invalid availability mode");

        var participants = await participantRepository.Get(p => p.GroupId == groupId && p.ProfileId == profileId);
        var participant = participants.FirstOrDefault();
        if (participant == null) throw new Exception("You are not a participant of this group.");

        participant.AvailabilityMode = (AvailabilityMode)mode;
        await participantRepository.UpdateAsync(participant);
        await realtimeNotifier.NotifyParticipantsChangedAsync(groupId);
    }

    private static GroupDto Map(AskDate.Domain.Entities.Group group)
    {
        return new GroupDto
        {
            Id = group.Id ?? 0,
            Name = group.Name,
            InviteLink = group.InviteLink,
            CreatorProfileId = group.CreatorProfileId,
            Participants = group.Participants?.Select(p => new ParticipantDto
            {
                ProfileId = p.ProfileId,
                ProfileName = "", // Names resolved via ProfileApiClient
                Role = p.Role,
                AvailabilityMode = (int)p.AvailabilityMode
            }).ToList() ?? new List<ParticipantDto>()
        };
    }
}
