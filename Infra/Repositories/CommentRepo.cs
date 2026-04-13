using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace AskDate.Infra.Repositories;

public class CommentRepo(DbContext context) : BaseRepository<Comment>(context), ICommentRepository
{
    protected override int? GetId(Comment entity)
    {
        return entity.Id;
    }
}
