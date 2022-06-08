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
    public class LanguageController : ControllerBase
    {
        private readonly IRepository<Language> _languageRepository;
        private readonly ILanguageService _languageService;

        public LanguageController(IRepository<Language> languageRepository, ILanguageService languageService)
        {
            _languageRepository = languageRepository;
            _languageService = languageService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _languageService.GetAllLanguageAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var language = await _languageService.GetLanguageByIdAsync(id);
            if (language == null)
                throw new Exception("Not found");

            return Ok(language);
        }
    }
}
