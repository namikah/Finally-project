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
    public class SeatService : EFCoreRepository<Seat>, ISeatService
    {
        public SeatService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Seat>> GetAllSeatAsync()
        {
            var seats = await GetAllRelations()
                .Include(x=>x.Hall)
                .Include(x=>x.SeatType)
                .AsNoTracking()
                .ToListAsync();

            return seats;
        }

        public async Task<Seat> GetSeatByIdAsync(int? id)
        {
            if (id == null) return new Seat();

            var seat = await GetAllRelations()
                .Include(x=>x.Hall)
                .Include(x=>x.SeatType)
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return seat;
        }
    }
}
