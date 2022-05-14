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
    public class DolbyAtmosService : EFCoreRepository<DolbyAtmos>, IDolbyAtmosService
    {
        public DolbyAtmosService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<DolbyAtmos>> GetAllDolbyAtmosAsync()
        {
            var dolbyAtmos = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return dolbyAtmos;
        }

        public async Task<DolbyAtmos> GetDolbyAtmosByIdAsync(int? id)
        {
            if (id == null) return new DolbyAtmos();

            var dolbyAtmos = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return dolbyAtmos;
        }
    }
}
