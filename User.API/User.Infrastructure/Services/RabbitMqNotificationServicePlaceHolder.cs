using System;
using Users.Application.Interfaces;
using Users.Domain.QueueEntities;

namespace Users.Infrastructure.Services;

public class RabbitMqNotificationServicePlaceHolder : INotificationQueueService
{
    public ValueTask DisposeAsync()
    {
        throw new NotImplementedException();
    }

    public Task PublishNotification(NotificationMessage message)
    {
        throw new NotImplementedException();
    }
}
