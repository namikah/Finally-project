using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ICinemaService : IRepository<Cinema>
    {
        Task<List<Cinema>> GetAllCinemaAsync();

        Task<Cinema> GetCinemaByIdAsync(int? id);
    }
}
