using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AskDate.Web;

/// <summary>
/// Authorization filters that reject users who are not members of the target group.
/// Availability marks are personal data and notes/comments are group-private, so every
/// group-scoped endpoint must verify membership — not only that the caller is logged in.
/// Sequential ids make "any logged-in user" checks easy to abuse otherwise.
/// </summary>
public abstract class GroupMembershipAttribute : Attribute, IAsyncAuthorizationFilter
{
    /// <returns>The group the request targets, or null when the target does not exist.</returns>
    protected abstract ValueTask<int?> ResolveGroupIdAsync(AuthorizationFilterContext context);

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var groupId = await ResolveGroupIdAsync(context);
        if (groupId is null)
        {
            context.Result = new NotFoundResult();
            return;
        }

        var httpContext = context.HttpContext;
        var profileId = PrincipalExtensions.GetProfileId(httpContext);
        if (profileId > 0)
        {
            var participants = httpContext.RequestServices.GetRequiredService<IParticipantRepository>();
            if (await participants.IsMemberAsync(groupId.Value, profileId)) return;
        }

        context.Result = new ForbidResult();
    }
}

/// <summary>The group id is taken directly from the "groupId" or "id" route value.</summary>
public sealed class MemberOfGroupAttribute : GroupMembershipAttribute
{
    protected override ValueTask<int?> ResolveGroupIdAsync(AuthorizationFilterContext context)
    {
        var values = context.RouteData.Values;
        var raw = values.GetValueOrDefault("groupId") ?? values.GetValueOrDefault("id");
        return ValueTask.FromResult<int?>(
            int.TryParse(raw?.ToString(), out var id) && id > 0 ? id : null);
    }
}

/// <summary>The group is resolved through the note named by the "noteId" or "id" route value.</summary>
public sealed class MemberOfNoteGroupAttribute : GroupMembershipAttribute
{
    protected override async ValueTask<int?> ResolveGroupIdAsync(AuthorizationFilterContext context)
    {
        var raw = context.RouteData.Values.GetValueOrDefault("noteId") ?? context.RouteData.Values.GetValueOrDefault("id");
        if (!int.TryParse(raw?.ToString(), out var noteId)) return null;

        // Virtual instances are addressed by a negative id that encodes their series parent
        if (noteId < 0) noteId = INoteService.DecodeVirtualId(noteId).parentId;

        var notes = context.HttpContext.RequestServices.GetRequiredService<INoteRepository>();
        var note = await notes.GetByIdAsync(noteId);
        return note?.GroupId;
    }
}
