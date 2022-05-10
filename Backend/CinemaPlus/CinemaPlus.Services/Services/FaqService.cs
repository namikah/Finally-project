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
    public class FaqService : EFCoreRepository<Faq>, IFaqService
    {
        public FaqService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Faq>> GetAllFaqAsync()
        {
            var faqs = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return faqs;
        }

        public async Task<Faq> GetFaqByIdAsync(int? id)
        {
            if (id == null) return new Faq();

            var faq = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return faq;
        }
    }
}
