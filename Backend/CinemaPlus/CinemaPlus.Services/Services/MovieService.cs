using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IList<Movie>> GetAllMoviesAsync(int page, int perPage)
        {
            var movies = await GetAllForInclude()
               .AsNoTracking()
               .AsQueryable()
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
               .Skip((page - 1) * perPage)
               .Take(perPage)
               .ToListAsync();

            return movies;
        }

        public async Task<Movie> GetMovieByIdAsync(int? id)
        {
            var movie = await GetAllForInclude()
                 .AsNoTracking()
                 .AsQueryable()
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
