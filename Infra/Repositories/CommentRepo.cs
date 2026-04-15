using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using AskDate.Infra.Data;

namespace AskDate.Infra.Repositories;

public class CommentRepo(ApplicationDbContext context) : BaseRepository<Comment>(context), ICommentRepository
{
    protected override int? GetId(Comment entity)
    {
        return entity.Id;
    }
}
