using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ISeatTypeService : IRepository<SeatType>
    {
        Task<List<SeatType>> GetAllSeatTypeAsync();

        Task<SeatType> GetSeatTypeByIdAsync(int? id);
    }
}
