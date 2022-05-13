using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CinemaPlus.Repository.Repository;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.Services.Services
{
    public class TicketService : EFCoreRepository<Ticket>, ITicketService
    {
        public TicketService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Ticket>> GetAllTicketAsync()
        {
            return await GetAllRelations()
               .AsNoTracking()
               .Include(x => x.Session)
               .ThenInclude(x => x.Movie)
               .Include(x => x.Seat)
               .ThenInclude(x => x.Hall)
               .Include(x => x.Customer)
               .Where(x => x.IsDeleted == false)
               .ToListAsync();
        }

        public async Task<Ticket> GetTicketByIdAsync(int? id)
        {
            if (id == null) return new Ticket();

            var movie = await GetAllRelations()
               .AsNoTracking()
               .Include(x => x.Session)
               .Include(x => x.Seat)
               .Include(x => x.Customer)
               .FirstOrDefaultAsync(x => x.Id == (int)id && x.IsDeleted == false);

            return movie;
        }

        public async Task<List<Ticket>> AddTicketsAsync(List<Ticket> tickets)
        {
            if (tickets == null)
            {
                throw new Exception("Not found");
            }

            await AddAsync(tickets);

            return tickets;
        }

        public async Task<Ticket> AddTicketsAsync(Ticket ticket)
        {
            await AddAsync(ticket);

            return ticket;
        }

        public async Task<List<Ticket>> DeleteTicketsAsync(List<Ticket> tickets)
        {
            if (tickets == null)
            {
                throw new Exception("Not found");
            }

            await DeleteAsync(tickets);

            return tickets;
        }

        public async Task<Ticket> DeleteTicketsAsync(Ticket ticket)
        {
            await DeleteAsync(ticket);

            return ticket;
        }
    }
}
