using System;
using Users.Application.Interfaces;

namespace Users.Infrastructure.Services;

public class RedisCodeCacheServicePlaceholder : ICodeCacheService
{
    public Task RemoveCodeAsync(string v)
    {
        throw new NotImplementedException();
    }

    public Task<string?> RetrieveCodeAsync(string key)
    {
        throw new NotImplementedException();
    }

    public Task StoreCodeAsync(string key, string code, TimeSpan? expiry = null)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ValidateCodeAsync(string key, string code)
    {
        throw new NotImplementedException();
    }
}
