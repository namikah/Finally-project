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
    public class CinemaService : EFCoreRepository<Cinema>, ICinemaService
    {
        public CinemaService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Cinema>> GetAllCinemaAsync()
        {
            var cinemas = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Halls)
               .ThenInclude(x=>x.Seats)
               .Include(x => x.Tariffs)
               .ThenInclude(x=>x.Format)
               .ToListAsync();

            return cinemas;
        }

        public async Task<Cinema> GetCinemaByIdAsync(int? id)
        {
            if (id == null) return new Cinema();

            var cinema = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Halls)
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return cinema;
        }
    }
}
