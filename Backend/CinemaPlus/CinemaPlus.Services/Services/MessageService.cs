using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services
{
    public class MessageService : EFCoreRepository<Message>, IMessageService
    {
        public MessageService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Message>> GetAllMessageAsync()
        {
            var messages = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return messages;
        }

        public async Task<Message> GetMessageByIdAsync(int? id)
        {
            if (id == null) return new Message();

            var message = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return message;
        }

        public async Task<Message> AddMessageAsync(Message message)
        {
            await AddAsync(message);

            return message;
        }
    }
}
