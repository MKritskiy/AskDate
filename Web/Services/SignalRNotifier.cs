using AskDate.Application.Interfaces;
using AskDate.Web.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AskDate.Web.Services;

/// <summary>Pushes compact change events to per-group SignalR channels.</summary>
public class SignalRNotifier(IHubContext<GroupHub> hubContext) : IRealtimeNotifier
{
    public Task NotifyNotesChangedAsync(int groupId) =>
        hubContext.Clients.Group(GroupHub.GroupName(groupId)).SendAsync("notesChanged", new { groupId });

    public Task NotifyCommentsChangedAsync(int groupId, int noteId) =>
        hubContext.Clients.Group(GroupHub.GroupName(groupId)).SendAsync("commentsChanged", new { groupId, noteId });

    public Task NotifyParticipantsChangedAsync(int groupId) =>
        hubContext.Clients.Group(GroupHub.GroupName(groupId)).SendAsync("participantsChanged", new { groupId });

    public Task NotifyGroupUpdatedAsync(int groupId, bool deleted = false) =>
        hubContext.Clients.Group(GroupHub.GroupName(groupId)).SendAsync("groupUpdated", new { groupId, deleted });
}
