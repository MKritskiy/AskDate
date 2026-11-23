using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AskDate.Web;

/// <summary>
/// Turns the exceptions services throw for expected refusals (missing record, no access,
/// invalid argument) into proper status codes. Unexpected exceptions are logged and
/// answered with a generic 500 — their details never reach the client.
/// </summary>
public sealed class DomainExceptionHandler(ILogger<DomainExceptionHandler> logger) : IExceptionHandler
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        int status;
        string? detail;

        switch (exception)
        {
            case KeyNotFoundException e:
                (status, detail) = (StatusCodes.Status404NotFound, e.Message);
                break;
            case UnauthorizedAccessException e:
                (status, detail) = (StatusCodes.Status403Forbidden, e.Message);
                break;
            case ArgumentException e:
                (status, detail) = (StatusCodes.Status400BadRequest, e.Message);
                break;
            default:
                (status, detail) = (StatusCodes.Status500InternalServerError, null);
                logger.LogError(exception, "Unhandled exception for {Method} {Path}", httpContext.Request.Method, httpContext.Request.Path);
                break;
        }

        httpContext.Response.StatusCode = status;
        if (!httpContext.Response.HasStarted)
        {
            await httpContext.Response.WriteAsJsonAsync(
                new ProblemDetails { Status = status, Title = ReasonPhrases.GetReasonPhrase(status), Detail = detail },
                JsonOptions,
                cancellationToken);
        }

        return true;
    }
}
