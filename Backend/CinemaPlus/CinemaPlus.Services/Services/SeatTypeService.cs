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
    public class SeatTypeService : EFCoreRepository<SeatType>, ISeatTypeService
    {
        public SeatTypeService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<SeatType>> GetAllSeatTypeAsync()
        {
            var seatTypes = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .ToListAsync();

            return seatTypes;
        }

        public async Task<SeatType> GetSeatTypeByIdAsync(int? id)
        {
            if (id == null) return new SeatType();

            var seatType = await GetAllRelations()
                .AsNoTracking()
               .AsQueryable()
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return seatType;
        }

        public async Task<SeatType> AddSeatType(SeatType seatType)
        {
            await DbContext.AddAsync(seatType);
            await DbContext.SaveChangesAsync();

            return seatType;
        }
    }
}
