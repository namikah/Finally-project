using AutoMapper;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository;
using CinemaPlus.Services.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services
{
    public class MovieService : EFCoreRepository<Movie>, IMovieService
    {
        public MovieService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<Movie>> GetAllMoviesAsync()
        {
           return await GetAllAsync();
        }
    }
}
