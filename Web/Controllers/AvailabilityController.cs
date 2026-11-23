using System.Globalization;
using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Application.Services;
using AskDate.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AskDate.Web.Controllers;

/// <summary>Personal free/busy marks of the members of a group.</summary>
[ApiController]
[Route("api/groups/{groupId}/availability")]
[Authorize]
[MemberOfGroup]
public class AvailabilityController(IAvailabilityService availabilityService) : ControllerBase
{
    private const string DateFormat = "yyyy-MM-dd";
    private const string TimeFormat = "HH:mm";

    [HttpGet]
    public async Task<IActionResult> GetByGroup(int groupId)
    {
        return Ok(await availabilityService.GetByGroupAsync(groupId, this.GetProfileId()));
    }

    /// <summary>
    /// Adds a mark on every listed day for the current user. Overlaps are resolved by the server:
    /// same-type neighbours merge, the new mark overrides the other type. Returns the user's
    /// marks on those days as they are stored now.
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> Set(int groupId, SetAvailabilityDto dto)
    {
        if (!Enum.IsDefined(dto.Type))
            return BadRequest($"Type must be {(int)AvailabilityType.Free} (free) or {(int)AvailabilityType.Busy} (busy).");
        if (!TryParseDates(dto.Dates, out var dates, out var error))
            return BadRequest(error);
        if (!TryParseRange(dto.StartTime, dto.EndTime, out var start, out var end, out error))
            return BadRequest(error);

        var marks = await availabilityService.SetAsync(groupId, this.GetProfileId(), dates, dto.Type, start, end, dto.ReplaceIds);
        return Ok(marks);
    }

    /// <summary>Removes own marks by ids, or every own mark on the listed days. Returns the marks left on the touched days.</summary>
    [HttpDelete]
    public async Task<IActionResult> Remove(int groupId, RemoveAvailabilityDto dto)
    {
        var ids = dto.Ids ?? new List<int>();
        if (ids.Count > AvailabilityService.MaxIdsPerRequest)
            return BadRequest($"At most {AvailabilityService.MaxIdsPerRequest} mark ids per request.");

        List<DateOnly> dates;
        if (ids.Count > 0)
        {
            dates = new List<DateOnly>();
        }
        else if (!TryParseDates(dto.Dates, out dates, out var error))
        {
            return BadRequest(error);
        }

        var marks = await availabilityService.RemoveAsync(groupId, this.GetProfileId(), ids, dates);
        return Ok(marks);
    }

    [HttpDelete("all")]
    public async Task<IActionResult> RemoveAll(int groupId)
    {
        await availabilityService.RemoveAllAsync(groupId, this.GetProfileId());
        return NoContent();
    }

    private static bool TryParseDates(List<string>? values, out List<DateOnly> dates, out string error)
    {
        dates = new List<DateOnly>();
        error = string.Empty;

        if (values is null || values.Count == 0)
        {
            error = "At least one date is required.";
            return false;
        }
        if (values.Count > IAvailabilityService.MaxDatesPerRequest)
        {
            error = $"At most {IAvailabilityService.MaxDatesPerRequest} dates per request.";
            return false;
        }

        foreach (var value in values)
        {
            if (!DateOnly.TryParseExact(value, DateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
            {
                error = $"Invalid date \"{value}\". Expected {DateFormat}.";
                return false;
            }
            dates.Add(date);
        }
        return true;
    }

    // Both bounds make an interval; none makes a whole-day mark. An end of "24:00" or "23:59"
    // means "until the end of the day" (TimeOnly cannot express midnight).
    private static bool TryParseRange(string? start, string? end, out TimeOnly? from, out TimeOnly? to, out string error)
    {
        from = null;
        to = null;
        error = string.Empty;

        if (string.IsNullOrEmpty(start) && string.IsNullOrEmpty(end)) return true;

        if (!TimeOnly.TryParseExact(start, TimeFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var startValue))
        {
            error = $"StartTime must be \"{TimeFormat}\"; EndTime must be \"{TimeFormat}\", \"24:00\" (until the end of the day) or omitted together with StartTime (whole day).";
            return false;
        }

        TimeOnly? endValue = null;
        if (!string.IsNullOrEmpty(end) && end != "24:00" && end != "23:59")
        {
            if (!TimeOnly.TryParseExact(end, TimeFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsed))
            {
                error = $"EndTime must be \"{TimeFormat}\" or \"24:00\".";
                return false;
            }
            endValue = parsed;
        }

        if (endValue is not null && endValue.Value <= startValue)
        {
            error = "EndTime must be later than StartTime.";
            return false;
        }

        from = startValue;
        to = endValue;
        return true;
    }
}
