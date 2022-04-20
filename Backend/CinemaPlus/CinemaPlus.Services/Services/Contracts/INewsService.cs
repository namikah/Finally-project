using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface INewsService : IRepository<News>
    {
        Task<PaginationDto<News>> GetAllNewsAsync(int page, int perPage);

        Task<News> GetNewsByIdAsync(int? id);
    }
}
