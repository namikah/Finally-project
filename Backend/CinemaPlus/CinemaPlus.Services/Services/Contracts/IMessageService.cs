using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IMessageService : IRepository<Message>
    {
        Task<List<Message>> GetAllMessageAsync();

        Task<Message> GetMessageByIdAsync(int? id);
    }
}
