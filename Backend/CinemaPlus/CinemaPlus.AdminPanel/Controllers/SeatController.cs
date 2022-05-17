using CinemaPlus.AdminPanel.ViewModels;
using CinemaPlus.Data;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    [Authorize(Roles = RoleConstants.AdminRole)]
    public class SeatController : Controller
    {
        private readonly AppDbContext _dbContext;

        public SeatController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();
           var allHalls = await _dbContext.Halls
                .Include(x=>x.Cinema)
                .ToListAsync();

            var seats = await _dbContext.Seats.ToListAsync();
            var selectedHalls = new List<Hall>();
            foreach (var item in allHalls)
            {
                if (seats.Any(x => x.HallId == item.Id))
                    continue;
                selectedHalls.Add(item);
            }

            ViewBag.Halls = selectedHalls;

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(List<SeatDto> seats)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            foreach (var item in seats)
            {
                if (item.HallId == 0 || item.SeatTypeId == 0)
                    continue;

                var seat = new Seat()
                {
                    Row=item.Row,
                    Column = item.Column,
                    HallId = item.HallId,
                    SeatTypeId = item.SeatTypeId
                };
                await _dbContext.Seats.AddAsync(seat);
                await _dbContext.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }
    }
}
