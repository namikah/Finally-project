using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IMovieService : IRepository<Movie>
    {
        Task<List<Movie>> GetAllMoviesAsync();

        Task<Movie> GetMovieByIdAsync(int? id);
    }
}
