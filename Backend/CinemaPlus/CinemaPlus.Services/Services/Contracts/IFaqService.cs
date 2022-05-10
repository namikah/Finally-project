using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IFaqService : IRepository<Faq>
    {
        Task<List<Faq>> GetAllFaqAsync();

        Task<Faq> GetFaqByIdAsync(int? id);
    }
}
