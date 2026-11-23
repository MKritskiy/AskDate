using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace AskDate.Web.Hubs;

/// <summary>
/// Realtime hub. Clients join a per-group channel after loading a group;
/// service mutations broadcast compact change events to that channel.
/// </summary>
[Authorize]
public class GroupHub(IParticipantRepository participantRepository) : Hub
{
    public async Task JoinGroup(int groupId)
    {
        var profileId = GetProfileId();
        if (profileId <= 0 || groupId <= 0) return;

        // Only group members may subscribe to its channel
        var participants = await participantRepository.Get(p => p.GroupId == groupId && p.ProfileId == profileId);
        if (!participants.Any()) return;

        await Groups.AddToGroupAsync(Context.ConnectionId, GroupName(groupId));
    }

    public Task LeaveGroup(int groupId) =>
        Groups.RemoveFromGroupAsync(Context.ConnectionId, GroupName(groupId));

    private int GetProfileId()
    {
        var claim = Context.User?.FindFirst("profileId")?.Value;
        return int.TryParse(claim, out var id) ? id : 0;
    }

    internal static string GroupName(int groupId) => $"group-{groupId}";
}
