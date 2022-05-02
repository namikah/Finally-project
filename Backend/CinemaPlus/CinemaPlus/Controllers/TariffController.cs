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
    public class TariffController : ControllerBase
    {
        private readonly IRepository<Tariff> _tariffRepository;
        private readonly ITariffService _tariffService;

        public TariffController(IRepository<Tariff> tariffRepository, ITariffService tariffService)
        {
            _tariffRepository = tariffRepository;
            _tariffService = tariffService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _tariffService.GetAllTariffAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var tariff = await _tariffService.GetTariffByIdAsync(id);
            if (tariff == null)
                throw new Exception("Not found");

            return Ok(tariff);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Tariff tariff)
        {
            await _tariffService.AddAsync(tariff);

            return Ok(tariff);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] Tariff tariff)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != tariff.Id)
                throw new Exception("Invalid Credential");

            var existTariff = await _tariffService.GetAsync(id.Value);
            if (existTariff == null)
                throw new Exception("Not found");

            await _tariffRepository.UpdateAsync(tariff);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var tariff = await _tariffService.GetAsync(id.Value);
            if (tariff == null)
                throw new Exception("Not found");

            await _tariffRepository.DeleteAsync(tariff);

            return NoContent();
        }
    }
}
