using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IDolbyAtmosService : IRepository<DolbyAtmos>
    {
        Task<List<DolbyAtmos>> GetAllDolbyAtmosAsync();

        Task<DolbyAtmos> GetDolbyAtmosByIdAsync(int? id);
    }
}
