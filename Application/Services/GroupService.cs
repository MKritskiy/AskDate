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

        var dtos = groups.Select(Map).ToList();

        // One profile lookup for all groups instead of one per group
        var profileIds = dtos.SelectMany(d => d.Participants).Select(p => p.ProfileId).Distinct();
        var names = await profileApiClient.GetProfileNamesAsync(profileIds);
        foreach (var dto in dtos)
        {
            foreach (var p in dto.Participants)
            {
                p.ProfileName = names.GetValueOrDefault(p.ProfileId, "Unknown");
            }
        }

        return dtos;
    }

    public async Task<GroupDto> GetByIdAsync(int id)
    {
        var group = await groupRepository.GetByIdAsync("Participants", id);
        if (group == null) throw new KeyNotFoundException("Group not found");
        return await MapWithNames(group);
    }

    public async Task<GroupDto> GetByInviteLinkAsync(string link)
    {
        var group = await groupRepository.GetByInviteLinkAsync(link);
        if (group == null) throw new KeyNotFoundException("Group not found");
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
        if (group == null) throw new KeyNotFoundException("Group not found");

        group.Name = dto.Name;
        await groupRepository.UpdateAsync(group);

        await realtimeNotifier.NotifyGroupUpdatedAsync(id);
        return Map(group);
    }

    public async Task DeleteAsync(int id, int currentProfileId)
    {
        var group = await groupRepository.GetByIdAsync(id);
        if (group == null) throw new KeyNotFoundException("Group not found");
        if (group.CreatorProfileId != currentProfileId)
            throw new UnauthorizedAccessException("Only the group creator can delete the group.");

        await groupRepository.DeleteByIdAsync(id);
        await realtimeNotifier.NotifyGroupUpdatedAsync(id, deleted: true);
    }

    public async Task AddParticipantAsync(int groupId, int profileId, string? inviteLink)
    {
        var group = await groupRepository.GetByIdAsync("Participants", groupId);
        if (group == null) throw new KeyNotFoundException("Group not found");

        // Already a member — joining again is a no-op
        if (group.Participants.Any(p => p.ProfileId == profileId)) return;

        // Groups are private: joining needs the invite link, not just the numeric id
        var presented = inviteLink?.Trim();
        if (string.IsNullOrEmpty(presented) || !string.Equals(presented, group.InviteLink, StringComparison.OrdinalIgnoreCase))
            throw new UnauthorizedAccessException("A valid invite link is required to join this group.");

        var participant = new Participant { GroupId = groupId, ProfileId = profileId, Role = ParticipantRole.Member };
        await participantRepository.AddAsync(participant);
        await realtimeNotifier.NotifyParticipantsChangedAsync(groupId);
    }

    public async Task RemoveParticipantAsync(int groupId, int profileId, int currentProfileId)
    {
        var group = await groupRepository.GetByIdAsync(groupId);
        if (group == null) throw new KeyNotFoundException("Group not found");

        // Non-creators can only remove themselves
        if (group.CreatorProfileId != currentProfileId && profileId != currentProfileId)
            throw new UnauthorizedAccessException("Only the group creator can remove other participants.");

        // A group without its creator could never be deleted or managed again
        if (group.CreatorProfileId == currentProfileId && profileId == currentProfileId)
            throw new UnauthorizedAccessException("The creator cannot leave the group. Delete the group instead.");

        var participants = await participantRepository.Get(p => p.GroupId == groupId && p.ProfileId == profileId);
        var p = participants.FirstOrDefault();
        if (p == null) return;

        await participantRepository.DeleteByIdAsync(p.Id);
        await realtimeNotifier.NotifyParticipantsChangedAsync(groupId);
    }

    public async Task SetUnmarkedDaysFreeAsync(int groupId, int profileId, bool unmarkedDaysFree)
    {
        var participants = await participantRepository.Get(p => p.GroupId == groupId && p.ProfileId == profileId);
        var participant = participants.FirstOrDefault();
        if (participant == null) throw new KeyNotFoundException("You are not a participant of this group.");

        if (participant.UnmarkedDaysFree == unmarkedDaysFree) return;

        participant.UnmarkedDaysFree = unmarkedDaysFree;
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
                UnmarkedDaysFree = p.UnmarkedDaysFree
            }).ToList() ?? new List<ParticipantDto>()
        };
    }
}
