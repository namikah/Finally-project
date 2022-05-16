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
    public class NewsService : EFCoreRepository<News>, INewsService
    {
        public NewsService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<PaginationDto<News>> GetAllNewsAsync(int page, int perPage)
        {
            var totalNewsCount = (await GetAllAsync()).Count;

            var news = await GetAllRelations()
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Medias)
               .OrderByDescending(x => x.Id)
               .Skip((page - 1) * perPage)
               .Take(perPage)
               .ToListAsync();

            return new PaginationDto<News>()
            {
                Page = page,
                PerPage = perPage,
                Total = totalNewsCount,
                TotalPage = Math.Ceiling((decimal)totalNewsCount / perPage),
                Data = news
            };
        }

        public async Task<News> GetNewsByIdAsync(int? id)
        {
            if (id == null) return new News();

            var news = await GetAllRelations()
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Medias)
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return news;
        }
    }
}
