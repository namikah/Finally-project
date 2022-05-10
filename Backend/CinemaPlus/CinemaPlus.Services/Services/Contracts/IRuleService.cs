using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IRuleService : IRepository<Rule>
    {
        Task<List<Rule>> GetAllRuleAsync();

        Task<Rule> GetRuleByIdAsync(int? id);
    }
}
