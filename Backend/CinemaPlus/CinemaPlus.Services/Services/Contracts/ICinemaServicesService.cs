using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ICinemaServicesService : IRepository<CinemaServices>
    {
        Task<List<CinemaServices>> GetAllCinemaServicesAsync();

        Task<CinemaServices> GetCinemaServicesByIdAsync(int? id);
    }
}
