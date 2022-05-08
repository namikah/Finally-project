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
    public class AboutService : EFCoreRepository<About>, IAboutService
    {
        public AboutService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<About>> GetAllAboutAsync()
        {
            var abouts = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return abouts;
        }

        public async Task<About> GetAboutByIdAsync(int? id)
        {
            if (id == null) return new About();

            var about = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return about;
        }
    }
}
