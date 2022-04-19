using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ISessionService : IRepository<Session>
    {
        Task<List<Session>> GetAllSessionAsync();

        Task<Session> GetSessionByIdAsync(int? id);
    }
}
