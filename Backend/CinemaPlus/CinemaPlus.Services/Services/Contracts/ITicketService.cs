using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services.Contracts
{
    public interface ITicketService : IRepository<Ticket>
    {
        Task<List<Ticket>> GetAllTicketAsync();

        Task<Ticket> GetTicketByIdAsync(int? id);

        Task<List<Ticket>> AddTicketsAsync(List<Ticket> tickets);

        Task<Ticket> AddTicketsAsync(Ticket ticket);
    }
}
