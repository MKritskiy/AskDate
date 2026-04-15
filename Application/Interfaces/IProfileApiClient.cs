namespace AskDate.Application.Interfaces;

public interface IProfileApiClient
{
    Task<Dictionary<int, string>> GetProfileNamesAsync(IEnumerable<int> profileIds);
}