using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ITariffService : IRepository<Tariff>
    {
        Task<List<Tariff>> GetAllTariffAsync();

        Task<Tariff> GetTariffByIdAsync(int? id);
    }
}
