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
    public class NewsMediaController : Controller
    {
        private readonly AppDbContext _dbContext;

        public NewsMediaController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existNewsMedia = await _dbContext.NewsMedias
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existNewsMedia == null)
                return NotFound();

            var newsId = existNewsMedia.NewsId;

            _dbContext.NewsMedias.Remove(existNewsMedia);
            await _dbContext.SaveChangesAsync();

            return Redirect("/News/update/" +  newsId);
        }
    }
}
