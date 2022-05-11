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
    public class SessionController : ControllerBase
    {
        private readonly IRepository<Session> _sessionRepository;
        private readonly ISessionService _sessionService;
        private readonly IMapper _mapper;

        public SessionController(IRepository<Session> sessionRepository, ISessionService sessionService, IMapper mapper)
        {
            _sessionRepository = sessionRepository;
            _sessionService = sessionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _sessionService.GetAllSessionAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var session = await _sessionService.GetSessionByIdAsync(id);
            if (session == null)
                throw new Exception("Not found");

            return Ok(session);
        }
    }
}
