using CinemaPlus.Data;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    [Authorize(Roles = RoleConstants.AdminRole)]
    public class SessionController : Controller
    {
        private readonly AppDbContext _dbContext;

        public SessionController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var sessions = await _dbContext.Sessions
               .Include(x => x.Movie)
               .ThenInclude(x => x.Detail)
               .Include(x => x.SessionFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.Hall)
               .ThenInclude(x => x.Cinema)
               .ThenInclude(x => x.Tariffs)
               .Include(x => x.Hall)
               .OrderByDescending(x => x)
               .Where(x => x.IsDeleted == false)
               .ToListAsync();

            return View(sessions);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existSession = await _dbContext.Sessions
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existSession == null)
                return NotFound();

            existSession.IsDeleted = true;

            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }

        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Movies = await _dbContext.Movies.Include(x => x.Detail).Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Halls = await _dbContext.Halls.Include(x => x.Cinema).ToListAsync();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Session session, int selectedMovieId, int selectedHallId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Movies = await _dbContext.Movies.Include(x => x.Detail).Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Halls = await _dbContext.Halls.Include(x => x.Cinema).ToListAsync();

            if (!ModelState.IsValid)
                return View();

            var isExistSession = await _dbContext.Sessions
                .AnyAsync(x => x.IsDeleted == false && x.HallId == selectedHallId
                && x.Date.Year == session.Date.Year && x.Date.Day == session.Date.Day && x.Date.Month == session.Date.Month
                && x.Start.Hours == session.Start.Hours && x.Start.Minutes == session.Start.Minutes);

            if (isExistSession)
            {
                ModelState.AddModelError("", "Session already exist");
                return View();
            }

            var sessionFormats = new List<SessionFormats>();
            if (session.FormatsId != null)
            {
                foreach (var item in session.FormatsId)
                {
                    SessionFormats sessionFormat = new SessionFormats()
                    {
                        SessionId = session.Id,
                        FormatId = item
                    };
                    sessionFormats.Add(sessionFormat);
                }
            }
            session.SessionFormats = sessionFormats;
            session.HallId = selectedHallId;
            session.MovieId = selectedMovieId;

            await _dbContext.Sessions.AddAsync(session);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existSession = await _dbContext.Sessions
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Movies = await _dbContext.Movies.Include(x => x.Detail).Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Halls = await _dbContext.Halls.Include(x => x.Cinema).ToListAsync();

            ViewBag.SelectedMovie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == existSession.MovieId);
            ViewBag.SelectedHall = await _dbContext.Halls.FirstOrDefaultAsync(x => x.Id == existSession.HallId);
            ViewBag.SelectedFormats = await _dbContext.SessionFormats.Where(x => x.SessionId == id).ToListAsync();

            return View(existSession);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Session session, int selectedMovieId, int selectedHallId)
        {
            if (id == null)
                return NotFound();

            if (id != session.Id)
                return BadRequest();

            var existSession = await _dbContext.Sessions
               .Include(x => x.SessionFormats)
               .ThenInclude(x => x.Format)
               .Include(x => x.Hall)
               .Include(x => x.Movie)
               .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Movies = await _dbContext.Movies.Include(x => x.Detail).Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Halls = await _dbContext.Halls.Include(x => x.Cinema).ToListAsync();

            ViewBag.SelectedMovie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == existSession.MovieId);
            ViewBag.SelectedHall = await _dbContext.Halls.FirstOrDefaultAsync(x => x.Id == existSession.HallId);
            ViewBag.SelectedFormats = await _dbContext.SessionFormats.Where(x => x.SessionId == id).ToListAsync();

            if (!ModelState.IsValid)
                return View(existSession);

            var isExistSession = await _dbContext.Sessions
                .AnyAsync(x => x.IsDeleted == false && x.HallId == selectedHallId
                && x.Date.Year == session.Date.Year && x.Date.Day == session.Date.Day && x.Date.Month == session.Date.Month
                && x.Start.Hours == session.Start.Hours && x.Start.Minutes == session.Start.Minutes && x.Id != id);

            if (isExistSession)
            {
                ModelState.AddModelError("", "Session already exist");
                return View(existSession);
            }

            var sessionFormats = new List<SessionFormats>();
            if (session.FormatsId != null)
            {
                foreach (var item in session.FormatsId)
                {
                    SessionFormats sessionFormat = new SessionFormats()
                    {
                        SessionId = session.Id,
                        FormatId = item
                    };
                    sessionFormats.Add(sessionFormat);
                }
            }

            var existHall = await _dbContext.Halls.FirstOrDefaultAsync(x => x.Id == selectedHallId);
            var existMovie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == selectedMovieId && x.IsDeleted == false);

            if (existHall == null || existMovie == null)
            {
                ModelState.AddModelError("", "Incorrect selection");
                return View(existSession);
            }

            existSession.Date = session.Date;
            existSession.Start = session.Start;
            existSession.End = session.End;
            existSession.Movie = existMovie;
            existSession.Hall = existHall;
            existSession.SessionFormats = sessionFormats;
            existSession.IsDeleted = false;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
