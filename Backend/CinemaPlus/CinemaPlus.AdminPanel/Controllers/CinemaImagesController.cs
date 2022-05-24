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
    public class CinemaImagesController : Controller
    {
        private readonly AppDbContext _dbContext;

        public CinemaImagesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existCinemaImage = await _dbContext.CinemaImages
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existCinemaImage == null)
                return NotFound();

            var cinemaId = existCinemaImage.CinemaId;

            _dbContext.CinemaImages.Remove(existCinemaImage);
            await _dbContext.SaveChangesAsync();

            return Redirect("/Cinema/Update/" + cinemaId);
        }
    }
}
