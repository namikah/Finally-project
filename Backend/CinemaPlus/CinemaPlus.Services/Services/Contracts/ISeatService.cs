using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ISeatService : IRepository<Seat>
    {
        Task<List<Seat>> GetAllSeatAsync();

        Task<Seat> GetSeatByIdAsync(int? id);
    }
}
