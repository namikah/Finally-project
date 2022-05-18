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
    public class HallController : Controller
    {
        private readonly AppDbContext _dbContext;

        public HallController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var halls = await _dbContext.Halls
                .Include(x => x.Cinema)
                .Include(x => x.Seats)
                .ToListAsync();

            return View(halls);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existHall = await _dbContext.Halls
                .FirstOrDefaultAsync(x => x.Id == id);
            if (existHall == null)
                return NotFound();

            _dbContext.Remove(existHall);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Hall hall)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();

            if (!ModelState.IsValid)
                return View();

           var isExistHall = await _dbContext.Halls
          .AnyAsync(x => x.Name == hall.Name && x.CinemaId == hall.CinemaId);

            if (isExistHall)
            {
                ModelState.AddModelError("", "Hall already exist");
                return View();
            }

            await _dbContext.Halls.AddAsync(hall);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existHall = await _dbContext.Halls
              .FirstOrDefaultAsync(x => x.Id == id);

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();

            return View(existHall);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Hall hall)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != hall.Id)
                return BadRequest();

            var existHall = await _dbContext.Halls
              .FirstOrDefaultAsync(x=>x.Id == id);

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();

            if (!ModelState.IsValid)
                return View(existHall);

            var isExistHall = await _dbContext.Halls
                .AnyAsync(x=> x.Name == hall.Name && x.CinemaId == hall.CinemaId && x.Id != id);

            if (isExistHall)
            {
                ModelState.AddModelError("", "Hall already exist");
                return View(existHall);
            }

            existHall.Name = hall.Name;
            existHall.CinemaId = hall.CinemaId;
            existHall.RowCount = hall.RowCount;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
