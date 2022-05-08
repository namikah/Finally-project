using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IAboutService : IRepository<About>
    {
        Task<List<About>> GetAllAboutAsync();

        Task<About> GetAboutByIdAsync(int? id);
    }
}
