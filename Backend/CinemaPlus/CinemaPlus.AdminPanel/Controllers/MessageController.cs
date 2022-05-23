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
    public class MessageController : Controller
    {
        private readonly AppDbContext _dbContext;

        public MessageController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var messages = await _dbContext.Messages
                .Where(x => x.IsDeleted == false)
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return View(messages);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existMessage = await _dbContext.Messages
                .FirstOrDefaultAsync(x => x.Id == id);
            if (existMessage == null)
                return NotFound();

            existMessage.IsDeleted = true;
            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }

        public IActionResult Reply()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            return View();
        }


        public async Task<IActionResult> Read(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existMessage = await _dbContext.Messages
              .FirstOrDefaultAsync(x => x.Id == id);

            existMessage.IsRead = true;
            await _dbContext.SaveChangesAsync();

            return View(existMessage);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Read(int? id, string title, string body)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existMessage = await _dbContext.Messages
              .FirstOrDefaultAsync(x => x.Id == id);

            if (!ModelState.IsValid)
                return View(existMessage);

            MyEmailUtil.SendSubcribeEmail(existMessage.Email, title, body);

            return RedirectToAction("Index");
        }
    }
}
