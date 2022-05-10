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
    }
}
