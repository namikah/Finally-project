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

            var seats = await _dbContext.Seats
                .Include(x => x.Hall.Cinema)
                .Include(x => x.SeatType)
                .OrderByDescending(x=>x.HallId)
                .ToListAsync();

            return View(seats);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            var halls = await _dbContext.Halls
                 .Include(x => x.Cinema)
                 .ToListAsync();

            var seats = await _dbContext.Seats.ToListAsync();
            var selectedHalls = new List<Hall>();

            foreach (var item in halls)
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

                await _dbContext.Seats.AddAsync(new Seat()
                {
                    Row = item.Row,
                    Column = item.Column,
                    HallId = item.HallId,
                    SeatTypeId = item.SeatTypeId
                });
            }
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Create");
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existSeat = await _dbContext.Seats
              .Include(x => x.Hall.Cinema)
              .Include(x => x.SeatType)
              .FirstOrDefaultAsync(x => x.Id == id);

            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            return View(existSeat);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Seat seat, int selectedSeatTypeId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != seat.Id)
                return BadRequest();

            var existSeat = await _dbContext.Seats.FindAsync(id);

            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            if (!ModelState.IsValid)
                return View(existSeat);

            var isExistSeat = await _dbContext.Seats
              .AnyAsync(x => x.Row == seat.Row
              && x.Column == seat.Column
              && x.HallId == seat.HallId
              && x.Id != id);

            if (isExistSeat)
            {
                ModelState.AddModelError("", "Session already exist");
                return View(existSeat);
            }

            existSeat.Row = seat.Row;
            existSeat.Column = seat.Column;
            existSeat.SeatType = await _dbContext.SeatTypes.FindAsync(selectedSeatTypeId);

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existSeat = await _dbContext.Seats
                .FirstOrDefaultAsync(x => x.Id == id);
            if (existSeat == null)
                return NotFound();

            _dbContext.Remove(existSeat);
            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }
    }
}
