using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using CinemaPlus.Services.Services;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly IRepository<Cinema> _cinemaRepository;
        private readonly ICinemaService _cinemaService;

        public CinemaController(IRepository<Cinema> cinemaRepository, ICinemaService cinemaService)
        {
            _cinemaRepository = cinemaRepository;
            _cinemaService = cinemaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cinemaService.GetAllCinemaAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var cinema = await _cinemaService.GetCinemaByIdAsync(id);
            if (cinema == null)
                throw new Exception("Not found");

            return Ok(cinema);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Cinema cinema)
        {
            await _cinemaService.AddAsync(cinema);

            return Ok(cinema);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] Cinema cinema)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != cinema.Id)
                throw new Exception("Invalid Credential");

            var existCinema = await _cinemaService.GetAsync(id.Value);
            if (existCinema == null)
                throw new Exception("Not found");

            await _cinemaRepository.UpdateAsync(cinema);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var cinema = await _cinemaService.GetAsync(id.Value);
            if (cinema == null)
                throw new Exception("Not found");

            await _cinemaRepository.DeleteAsync(cinema);

            return NoContent();
        }
    }
}
