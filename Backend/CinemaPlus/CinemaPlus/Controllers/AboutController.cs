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
    public class AboutController : ControllerBase
    {
        private readonly IRepository<About> _aboutRepository;
        private readonly IAboutService _aboutService;

        public AboutController(IRepository<About> aboutRepository, IAboutService aboutService)
        {
            _aboutRepository = aboutRepository;
            _aboutService = aboutService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _aboutService.GetAllAboutAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var about = await _aboutService.GetAboutByIdAsync(id);
            if (about == null)
                throw new Exception("Not found");

            return Ok(about);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] About about)
        {
            await _aboutService.AddAsync(about);

            return Ok(about);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] About about)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != about.Id)
                throw new Exception("Invalid Credential");

            var existAbout = await _aboutService.GetAsync(id.Value);
            if (existAbout == null)
                throw new Exception("Not found");

            await _aboutRepository.UpdateAsync(about);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var about = await _aboutService.GetAsync(id.Value);
            if (about == null)
                throw new Exception("Not found");

            await _aboutRepository.DeleteAsync(about);

            return NoContent();
        }
    }
}
