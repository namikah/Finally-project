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
    public class SeatTypeController : ControllerBase
    {
        private readonly IRepository<SeatType> _seatTypeRepository;
        private readonly ISeatTypeService _seatTypeService;

        public SeatTypeController(IRepository<SeatType> seatTypeRepository, ISeatTypeService seatTypeService)
        {
            _seatTypeRepository = seatTypeRepository;
            _seatTypeService = seatTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _seatTypeService.GetAllSeatTypeAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var seatType = await _seatTypeService.GetSeatTypeByIdAsync(id);
            if (seatType == null)
                throw new Exception("Not found");

            return Ok(seatType);
        }
    }
}
