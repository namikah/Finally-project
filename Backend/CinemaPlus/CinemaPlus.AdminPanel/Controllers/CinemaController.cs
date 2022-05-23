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
    public class CinemaController : Controller
    {
        private readonly AppDbContext _dbContext;

        public CinemaController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var cinemas = await _dbContext.Cinemas
                .Include(x => x.Images)
                .Include(x => x.Halls)
                .Include(x => x.Tariffs)
                .ToListAsync();

            return View(cinemas);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existCinema = await _dbContext.Cinemas
                .FirstOrDefaultAsync(x => x.Id == id);
            if (existCinema == null)
                return NotFound();

            _dbContext.Remove(existCinema);
            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }

        public IActionResult Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Cinema cinema)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (!ModelState.IsValid)
                return View();

            var images = new List<CinemaImage>();
            if (cinema.Photos != null)
            {
                foreach (var photo in cinema.Photos)
                {
                    if (photo == null || photo.Length == 0)
                    {
                        ModelState.AddModelError("Photo", "Upload image.");
                        return View();
                    }

                    if (!photo.IsImage())
                    {
                        ModelState.AddModelError("Photo", $"{photo.Name} Duzgun shekil formati sechin.");
                        return View();
                    }

                    if (!photo.IsAllowedSize(2))
                    {
                        ModelState.AddModelError("Photo", $"{photo.Name} 2Mb-dan artiq ola bilmez.");
                        return View();
                    }
                    var cinemaImage = new CinemaImage()
                    {
                        Image = FileExtensions.UploadImage(photo.FileName, photo.OpenReadStream()).Url.ToString()
                    };

                    images.Add(cinemaImage);
                }
            }

            cinema.Images = images;

            await _dbContext.Cinemas.AddAsync(cinema);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existCinema = await _dbContext.Cinemas
                .Include(x=>x.Images)
              .FirstOrDefaultAsync(x => x.Id == id);

            return View(existCinema);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Cinema cinema)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != cinema.Id)
                return BadRequest();

            var existCinema= await _dbContext.Cinemas
                .Include(x=>x.Images)
              .FirstOrDefaultAsync(x => x.Id == id);

            if (!ModelState.IsValid)
                return View(existCinema);

            var isExistCinema = await _dbContext.Cinemas
                .AnyAsync(x => x.Name == cinema.Name && x.Id != id);

            if (isExistCinema)
            {
                ModelState.AddModelError("", "Session already exist");
                return View(existCinema);
            }

            var images = new List<CinemaImage>();
            if (cinema.Photos != null)
            {
                foreach (var photo in cinema.Photos)
                {
                    if (photo == null || photo.Length == 0)
                    {
                        ModelState.AddModelError("Photo", "Upload image.");
                        return View();
                    }

                    if (!photo.IsImage())
                    {
                        ModelState.AddModelError("Photo", $"{photo.Name} Duzgun shekil formati sechin.");
                        return View();
                    }

                    if (!photo.IsAllowedSize(2))
                    {
                        ModelState.AddModelError("Photo", $"{photo.Name} 2Mb-dan artiq ola bilmez.");
                        return View();
                    }
                    var cinemaImage = new CinemaImage()
                    {
                        Image = FileExtensions.UploadImage(photo.FileName, photo.OpenReadStream()).Url.ToString()
                    };
                    images.Add(cinemaImage);
                }
            }

            if (existCinema.Images != null && existCinema.Images.Count != 0)
            {
                foreach (var item in existCinema.Images.ToList())
                {
                    images.Add(item);
                }
            }

            existCinema.Name = cinema.Name;
            existCinema.Address = cinema.Address;
            existCinema.Email = cinema.Email;
            existCinema.Mobile = cinema.Mobile;
            existCinema.Description = cinema.Description;
            existCinema.MarketingMail = cinema.MarketingMail;
            existCinema.MapUrl = cinema.MapUrl;
            existCinema.TarifUrl = cinema.TarifUrl;
            existCinema.WorkTime = cinema.WorkTime;
            existCinema.Images = images;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
