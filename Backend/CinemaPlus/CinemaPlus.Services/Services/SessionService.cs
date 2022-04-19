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
               .Include(x => x.Hall)
               .OrderByDescending(x => x.Id)
               .ToListAsync();

            return sessions;
        }

        public async Task<Session> GetSessionByIdAsync(int? id)
        {
            if (id == null) return new Session();

            var movie = await GetAllRelations()
               .AsNoTracking()
               .AsQueryable()
               .Include(x => x.Movie)
               .Include(x => x.Hall)
               .FirstOrDefaultAsync(x => x.Id == (int)id);

            return movie;
        }
    }
}