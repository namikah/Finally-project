using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services
{
    public class MovieService : EFCoreRepository<Movie>, IMovieService
    {
        public MovieService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<PaginationDto<Movie>> GetAllMoviesAsync(int page, int perPage)
        {
            var totalMoviesCount = (await GetAllAsync()).Count;

            var movies = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Detail)
               .Include(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               //.ThenInclude(x=>x.Tariffs)
               .Include(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
               .OrderByDescending(x => x.Id)
               .Skip((page - 1) * perPage)
               .Take(perPage)
               .ToListAsync();

            return new PaginationDto<Movie>()
            {
                Page = page,
                PerPage = perPage,
                Total = totalMoviesCount,
                TotalPage = Math.Ceiling((decimal)totalMoviesCount / perPage),
                Data = movies
            };
        }

        public async Task<Movie> GetMovieByIdAsync(int? id)
        {
            if (id == null) return new Movie();

            var movie = await GetAllRelations()
                 .AsNoTracking()
                 .AsQueryable()
                .Include(x => x.Detail)
               .Include(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               //.ThenInclude(x=>x.Tariffs)
               .Include(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
                 .FirstOrDefaultAsync(x => x.Id == (int)id);

            return movie;
        }
    }
}
