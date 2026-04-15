using System.Net.Http.Json;
using AskDate.Application.Interfaces;

namespace AskDate.Infra.Services;

public class ProfileApiClient(HttpClient httpClient) : IProfileApiClient
{
    public async Task<Dictionary<int, string>> GetProfileNamesAsync(IEnumerable<int> profileIds)
    {
        var ids = profileIds.Distinct().ToList();
        if (!ids.Any()) return new Dictionary<int, string>();
        
        var query = string.Join("&", ids.Select(id => $"ids={id}"));
        try 
        {
            var response = await httpClient.GetAsync($"http://localhost:50002/api/Profile/profiles?{query}");
            if (response.IsSuccessStatusCode)
            {
                var profiles = await response.Content.ReadFromJsonAsync<List<ProfileResponse>>();
                return profiles?.ToDictionary(p => p.Id, p => $"{p.FirstName} {p.LastName}".Trim()) ?? new Dictionary<int, string>();
            }
        }
        catch { /* Ignore */ }
        return new Dictionary<int, string>();
    }

    private class ProfileResponse { public int Id { get; set; } public string FirstName { get; set; } public string LastName { get; set; } }
}