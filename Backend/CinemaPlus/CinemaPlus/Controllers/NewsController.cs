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
    }
}
