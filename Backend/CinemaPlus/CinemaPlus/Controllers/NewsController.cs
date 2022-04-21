using AutoMapper;
using CinemaPlus.Models.DTOs;
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
    public class NewsController : ControllerBase
    {
        private readonly IRepository<News> _newsRepository;
        private readonly INewsService _newsService;
        private readonly IMapper _mapper;

        public NewsController(IRepository<News> newsRepository, INewsService newsService, IMapper mapper)
        {
            _newsRepository = newsRepository;
            _newsService = newsService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int page = 1, int perpage = 12)
        {
            return Ok(await _newsService.GetAllNewsAsync(page, perpage));
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var news = await _newsService.GetNewsByIdAsync(id);
            if (news == null)
                throw new Exception("Not found");

            return Ok(news);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] NewsDto newsDto)
        {
            await _newsService.AddAsync(_mapper.Map<News>(newsDto));

            return Ok(newsDto);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] News news)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != news.Id)
                throw new Exception("Invalid Credential");

            var existNews = await _newsService.GetAsync(id.Value);
            if (existNews == null)
                throw new Exception("Not found");

            await _newsRepository.UpdateAsync(news);

            return Ok(news);
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var news = await _newsService.GetAsync(id.Value);
            if (news == null)
                throw new Exception("Not found");

            await _newsRepository.DeleteAsync(news);

            return NoContent();
        }
    }
}
