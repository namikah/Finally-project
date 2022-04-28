﻿using CinemaPlus.Models.DTOs;
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
            var sessions = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
               .Include(x => x.Hall)
               .ThenInclude(x => x.Cinema)
               .ThenInclude(x=>x.Tariffs)
               .Include(x=>x.Hall)
               .ThenInclude(x=>x.Seats)
               .ThenInclude(x=>x.SeatType)
                .Include(x => x.Movie)
               .ThenInclude(x => x.Detail)
               .OrderBy(x => x.Start)
               .ToListAsync();

            return sessions;
        }

        public async Task<Session> GetSessionByIdAsync(int? id)
        {
            if (id == null) return new Session();

            var session = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieActors)
               .ThenInclude(x => x.Actor)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieDirectors)
               .ThenInclude(x => x.Director)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.Movie)
               .ThenInclude(x => x.MovieGenres)
               .ThenInclude(x => x.Genre)
               .Include(x => x.Hall)
               .ThenInclude(x => x.Cinema)
               .ThenInclude(x => x.Tariffs)
               .Include(x => x.Hall)
               .ThenInclude(x => x.Seats)
               .ThenInclude(x => x.SeatType)
                .Include(x => x.Movie)
               .ThenInclude(x => x.Detail)
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return session;
        }
    }
}
