using AutoMapper;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IRepository<Ticket> _ticketRepository;
        private readonly ITicketService _ticketService;
        private readonly IMapper _mapper;

        public TicketController(IRepository<Ticket> ticketRepository, ITicketService ticketService, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _ticketService = ticketService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ticketService.GetAllTicketAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var ticket = await _ticketService.GetTicketByIdAsync(id);
            if (ticket == null)
                throw new Exception("Not found");

            return Ok(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] List<TicketDto> ticketDtos)
        {
            var tickets = new List<Ticket>();
            foreach (var item in ticketDtos)
            {
                var ticket = new Ticket()
                {
                    SeatId = item.Seat.Id,
                    IsDeleted = false,
                    Price = item.Price,
                    Customer = item.Customer,
                    Session = null
                    //Session = item.Session
                };
                tickets.Add(ticket);
            }

            await _ticketService.AddTicketsAsync(tickets);

            return Ok(tickets);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromForm] Ticket ticket)
        {
            if (id == null)
                throw new Exception("Not found");

            if (id != ticket.Id)
                throw new Exception("Invalid Credential");

            var existTicket = await _ticketService.GetAsync(id.Value);
            if (existTicket == null)
                throw new Exception("Not found");

            await _ticketRepository.UpdateAsync(ticket);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                throw new Exception("Not found");

            var ticket = await _ticketService.GetAsync(id.Value);
            if (ticket == null)
                throw new Exception("Not found");

            await _ticketRepository.DeleteAsync(ticket);

            return NoContent();
        }
    }
}
