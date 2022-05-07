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
    public class TariffService : EFCoreRepository<Tariff>, ITariffService
    {
        public TariffService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Tariff>> GetAllTariffAsync()
        {
            var tarifss = await GetAllRelations()
                .Include(x => x.Cinema)
                .Include(x => x.Format)
                .Where(x => x.IsDeleted == false)
                .ToListAsync();

            return tarifss;
        }

        public async Task<Tariff> GetTariffByIdAsync(int? id)
        {
            if (id == null) return new Tariff();

            var tariff = await GetAllRelations()
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);

            return tariff;
        }
    }
}
