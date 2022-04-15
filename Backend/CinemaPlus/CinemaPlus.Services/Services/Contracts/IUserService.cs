using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface IUserService
    {
        Task<string> RegisterAsync(UserDto model);

        Task<List<User>> GetAsync();
    }
}
