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
    public class MovieService : EFCoreRepository<Movie>, IMovieService
    {
        public MovieService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await GetAllRelations()
               .AsNoTracking()
               .Include(x => x.Detail)
               .Include(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
               .OrderByDescending(x => x.Id)
               .ToListAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(int? id)
        {
            if (id == null) return new Movie();

            var movie = await GetAllRelations()
                 .AsNoTracking()
                .Include(x => x.Detail)
               .Include(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
                 .FirstOrDefaultAsync(x => x.Id == (int)id);

            return movie;
        }
    }
}
