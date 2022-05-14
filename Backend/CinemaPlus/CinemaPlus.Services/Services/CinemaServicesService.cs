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
    public class CinemaServicesService : EFCoreRepository<CinemaServices>, ICinemaServicesService
    {
        public CinemaServicesService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<CinemaServices>> GetAllCinemaServicesAsync()
        {
            var cinemaServices = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return cinemaServices;
        }

        public async Task<CinemaServices> GetCinemaServicesByIdAsync(int? id)
        {
            if (id == null) return new CinemaServices();

            var cinemaServices = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return cinemaServices;
        }
    }
}
