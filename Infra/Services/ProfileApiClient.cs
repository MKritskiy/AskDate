using System.Net.Http.Json;
using AskDate.Application.Interfaces;

namespace AskDate.Infra.Services;

public class ProfileApiClient(HttpClient httpClient, IConfiguration configuration) : IProfileApiClient
{
    public async Task<Dictionary<int, string>> GetProfileNamesAsync(IEnumerable<int> profileIds)
    {
        var ids = profileIds.Distinct().ToList();
        if (!ids.Any()) return new Dictionary<int, string>();

        var query = string.Join("&", ids.Select(id => $"ids={id}"));
        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, $"http://users.web:8080/api/Profile/profiles?{query}");

            // Service-to-service auth: the profiles endpoint accepts an internal API key
            var apiKey = configuration["Internal:ApiKey"];
            if (!string.IsNullOrEmpty(apiKey))
            {
                request.Headers.Add("X-Internal-Api-Key", apiKey);
            }

            var response = await httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var profiles = await response.Content.ReadFromJsonAsync<List<ProfileResponse>>();
                return profiles?.ToDictionary(p => p.Id, p => $"{p.FirstName} {p.LastName}".Trim()) ?? new Dictionary<int, string>();
            }
        }
        catch { /* Ignore */ }
        return new Dictionary<int, string>();
    }

    private class ProfileResponse { public int Id { get; set; } public string FirstName { get; set; } = ""; public string LastName { get; set; } = ""; }
}