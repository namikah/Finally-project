using AutoMapper;
using CinemaPlus.Data;
using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository.Contracts;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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
        private readonly AppDbContext _dbContext;

        public TicketController(IRepository<Ticket> ticketRepository, ITicketService ticketService, IMapper mapper, AppDbContext dbContext)
        {
            _ticketRepository = ticketRepository;
            _ticketService = ticketService;
            _mapper = mapper;
            _dbContext = dbContext;
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
            var result = true;
            var existTickets = await _dbContext.Tickets.Where(x=>x.IsDeleted==false).ToListAsync();

            var tickets = new List<Ticket>();
            foreach (var item in ticketDtos)
            {
                var ticket = new Ticket()
                {
                    SeatId = item.SeatId,
                    Price = item.Price,
                    Customer = item.Customer,
                    SessionId = item.Session.Id,
                    IsDeleted = false,
                    IsConfirmed = false,
                };
                if (existTickets.Any(x=>x.SeatId == ticket.SeatId && x.SessionId == ticket.SessionId)) {
                    return Ok(false);
                }
                    tickets.Add(ticket);
            }

            await _ticketService.AddTicketsAsync(tickets);

            Thread.Sleep(60*1000);

            var DeletedTickets = new List<Ticket>();
            foreach (var item in tickets)
            {
                var ticket = await _dbContext.Tickets.FirstOrDefaultAsync(x => x.SeatId == item.SeatId && x.SessionId == item.SessionId && x.IsConfirmed == false && x.IsDeleted == false);

                if (ticket == null)
                    continue;

                result = false;
                ticket.IsDeleted = true;
                await _dbContext.SaveChangesAsync();
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] List<TicketDto> ticketDtos)
        {
            var result = true;

            if (ticketDtos == null || ticketDtos.Count ==0)
                throw new Exception("Not found");

            var DeletedTickets = new List<Ticket>();
            foreach (var item in ticketDtos)
            {
                var ticket = await _dbContext.Tickets.FirstOrDefaultAsync(x => x.SeatId == item.SeatId && x.SessionId == item.Session.Id && x.IsConfirmed == false && x.IsDeleted == false);
                if (ticket == null)
                {
                    result = false;
                    return Ok(result);
                }

                ticket.IsConfirmed = true;
                await _dbContext.SaveChangesAsync();
            }

            return Ok(result);
        }
    }
}
