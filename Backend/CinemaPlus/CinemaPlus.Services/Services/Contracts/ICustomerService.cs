using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ICustomerService : IRepository<Customer>
    {
        Task<List<Customer>> GetAllCustomerAsync();

        Task<Customer> GetCustomerByIdAsync(int? id);
    }
}
