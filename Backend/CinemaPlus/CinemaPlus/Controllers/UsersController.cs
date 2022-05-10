using AutoMapper;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UsersController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var userDtos = new List<UserDto>();
            foreach (var item in await _userService.GetAsync())
            {
                userDtos.Add(_mapper.Map<UserDto>(item));
            }

            return Ok(userDtos);
        }
    }
}
