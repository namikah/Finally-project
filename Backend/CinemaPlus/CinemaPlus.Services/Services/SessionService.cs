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
    public class SessionService : EFCoreRepository<Session>, ISessionService
    {
        public SessionService(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Session>> GetAllSessionAsync()
        {
            DateTime dt = DateTime.Today;

            var sessions = await GetAllRelations()
               .Include(x => x.Movie)
               .ThenInclude(x => x.Detail)
               .Include(x => x.Hall)
               .ThenInclude(x => x.Cinema)
               .Include(x => x.Format)
               .Include(x => x.Language)
               .Where(x => x.IsDeleted == false && x.Date >= dt.Date)
               .AsNoTracking()
               .ToListAsync();

            return sessions;
        }

        public async Task<Session> GetSessionByIdAsync(int? id)
        {
            if (id == null) return new Session();

            DateTime dt = DateTime.Today;

            var session = await GetAllRelations()
               .Include(x => x.Hall)
               .ThenInclude(x => x.Seats.OrderBy(x => x.Column))
               .ThenInclude(x => x.SeatType)
               .Include(x => x.Format)
               .Include(x => x.Language)
               .AsNoTracking()
               .FirstOrDefaultAsync(x => x.Id == (int)id && x.IsDeleted == false && x.Date >= dt.Date);

            return session;
        }
    }
}
