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

        public SessionController(IRepository<Session> sessionRepository, ISessionService sessionService)
        {
            _sessionRepository = sessionRepository;
            _sessionService = sessionService;
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

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] Session session)
        {
            await _sessionService.AddAsync(session);

            return Ok(session);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] Session session)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != session.Id)
                throw new Exception("Invalid Credential");

            var existSession = await _sessionService.GetAsync(id.Value);
            if (existSession == null)
                throw new Exception("Not found");

            await _sessionRepository.UpdateAsync(session);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var session = await _sessionService.GetAsync(id.Value);
            if (session == null)
                throw new Exception("Not found");

            await _sessionRepository.DeleteAsync(session);

            return NoContent();
        }
    }
}
