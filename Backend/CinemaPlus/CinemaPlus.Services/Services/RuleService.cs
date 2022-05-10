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
    public class RuleService : EFCoreRepository<Rule>, IRuleService
    {
        public RuleService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Rule>> GetAllRuleAsync()
        {
            var rules = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return rules;
        }

        public async Task<Rule> GetRuleByIdAsync(int? id)
        {
            if (id == null) return new Rule();

            var rule = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return rule;
        }
    }
}
