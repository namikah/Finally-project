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
    public class TariffController : Controller
    {
        private readonly AppDbContext _dbContext;

        public TariffController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var tariff = await _dbContext.Tariffs
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Cinema)
                .Include(x => x.Format)
                .Include(x => x.SeatType)
                .OrderByDescending(x => x.Id)
                .OrderByDescending(x => x.CinemaId)
                .ToListAsync();

            return View(tariff);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existTariff = await _dbContext.Tariffs
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existTariff == null)
                return NotFound();

            existTariff.IsDeleted = true;

            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }

        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Tariff tariff, int selectedFormatId, int selectedCinemaId, int selectedSeatTypeId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            if (!ModelState.IsValid)
                return View();

            tariff.FormatId = selectedFormatId;
            tariff.CinemaId = selectedCinemaId;
            tariff.SeatType = await _dbContext.SeatTypes.FindAsync(selectedSeatTypeId);

            await _dbContext.Tariffs.AddAsync(tariff);
            await _dbContext.SaveChangesAsync();

            //return RedirectToAction("Index");
            return View(tariff);
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existTariff = await _dbContext.Tariffs
              .Include(x => x.Cinema)
              .Include(x => x.Format)
              .Include(x => x.SeatType)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            return View(existTariff);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Tariff tariff,int selectedCinemaId, int selectedFormatId, int selectedSeatTypeId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != tariff.Id)
                return BadRequest();

            var existTariff = await _dbContext.Tariffs
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Cinemas = await _dbContext.Cinemas.ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.SeatTypes = await _dbContext.SeatTypes.ToListAsync();

            if (!ModelState.IsValid)
                return View(existTariff);

            var isExistTariff = await _dbContext.Tariffs
                .AnyAsync(x => x.IsDeleted == false
                && x.Name == tariff.Name
                && x.CinemaId == tariff.CinemaId
                && x.FormatId == tariff.FormatId
                && x.SeatType == tariff.SeatType
                && x.Id != id);

            if (isExistTariff)
            {
                ModelState.AddModelError("", "Session already exist");
                return View(existTariff);
            }

            existTariff.Name = tariff.Name;
            existTariff.CinemaId = selectedCinemaId;
            existTariff.FormatId = selectedFormatId;
            existTariff.SeatType = await _dbContext.SeatTypes.FindAsync(selectedSeatTypeId);
            existTariff.StartTime = tariff.StartTime;
            existTariff.EndTime = tariff.EndTime;
            existTariff.StartDayOfWeek = tariff.StartDayOfWeek;
            existTariff.EndDayOfWeek = tariff.EndDayOfWeek;
            existTariff.AudioFormat = tariff.AudioFormat;
            existTariff.Price = tariff.Price;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
