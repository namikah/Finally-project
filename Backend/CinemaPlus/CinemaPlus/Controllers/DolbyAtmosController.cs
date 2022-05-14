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
    public class DolbyAtmosController : ControllerBase
    {
        private readonly IRepository<DolbyAtmos> _dolbyAtmosRepository;
        private readonly IDolbyAtmosService _dolbyAtmosService;

        public DolbyAtmosController(IRepository<DolbyAtmos> dolbyAtmosRepository, IDolbyAtmosService dolbyAtmosService)
        {
            _dolbyAtmosRepository = dolbyAtmosRepository;
            _dolbyAtmosService = dolbyAtmosService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _dolbyAtmosService.GetAllDolbyAtmosAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var dolbyAtmos = await _dolbyAtmosService.GetDolbyAtmosByIdAsync(id);
            if (dolbyAtmos == null)
                throw new Exception("Not found");

            return Ok(dolbyAtmos);
        }
    }
}
