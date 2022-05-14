using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaServicesController : ControllerBase
    {
        private readonly ICinemaServicesService _cinemaServicesService;

        public CinemaServicesController(ICinemaServicesService cinemaServicesService)
        {
            _cinemaServicesService = cinemaServicesService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cinemaServicesService.GetAllCinemaServicesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var cinemaServices = await _cinemaServicesService.GetCinemaServicesByIdAsync(id);
            if (cinemaServices == null)
                throw new Exception("Not found");

            return Ok(cinemaServices);
        }
    }
}
