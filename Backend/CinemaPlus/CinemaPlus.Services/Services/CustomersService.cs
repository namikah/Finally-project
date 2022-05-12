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
    public class CustomersService : EFCoreRepository<Customer>, ICustomerService
    {
        public CustomersService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Customer>> GetAllCustomerAsync()
        {
            var abouts = await GetAllRelations()
                .AsNoTracking()
                .ToListAsync();

            return abouts;
        }

        public async Task<Customer> GetCustomerByIdAsync(int? id)
        {
            if (id == null) return new Customer();

            var about = await GetAllRelations()
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return about;
        }
    }
}
