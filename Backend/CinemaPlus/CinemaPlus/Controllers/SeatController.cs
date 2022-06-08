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
    public class SeatController : ControllerBase
    {
        private readonly IRepository<Seat> _seatRepository;
        private readonly ISeatService _seatService;

        public SeatController(IRepository<Seat> seatRepository, ISeatService seatService)
        {
            _seatRepository = seatRepository;
            _seatService = seatService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _seatService.GetAllSeatAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var seat = await _seatService.GetSeatByIdAsync(id);
            if (seat == null)
                throw new Exception("Not found");

            return Ok(seat);
        }
    }
}
