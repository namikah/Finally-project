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
    public class LanguageService : EFCoreRepository<Language>, ILanguageService
    {
        public LanguageService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Language>> GetAllLanguageAsync()
        {
            var languages = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return languages;
        }

        public async Task<Language> GetLanguageByIdAsync(int? id)
        {
            if (id == null) return new Language();

            var language = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return language;
        }
    }
}
