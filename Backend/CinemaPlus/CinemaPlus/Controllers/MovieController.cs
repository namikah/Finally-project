using AutoMapper;
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
    public class MovieController : ControllerBase
    {
        private readonly IRepository<Movie> _movieRepository;
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;

        public MovieController(IRepository<Movie> movieRepository, IMovieService movieService, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _movieService = movieService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _movieService.GetAllMoviesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
                throw new Exception("Not found");

            return Ok(movie);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Movie movie)
        {
            await _movieService.AddAsync(movie);

            return Ok(movie);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] Movie movie)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != movie.Id)
                throw new Exception("Invalid Credential");

            var existMovie = await _movieService.GetAsync(id.Value);
            if (existMovie == null)
                throw new Exception("Not found");

            await _movieRepository.UpdateAsync(movie);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var movie = await _movieService.GetAsync(id.Value);
            if (movie == null)
                throw new Exception("Not found");

            await _movieRepository.DeleteAsync(movie);

            return NoContent();
        }
    }
}
