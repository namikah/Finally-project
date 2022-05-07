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
    public class TicketController : Controller
    {
        private readonly AppDbContext _dbContext;

        public TicketController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            DateTime dt = DateTime.Today;

            var tickets = await _dbContext.Tickets
                .Where(x => x.IsDeleted == false && x.Session.Date >= dt.Date)
                .Include(x => x.Session)
                .ThenInclude(x => x.Movie)
                .Include(x => x.Session)
                .ThenInclude(x => x.Hall.Cinema)
                .Include(x => x.Seat)
                .Include(x => x.Customer)
                .Include(x => x.Session.Hall.Cinema.Tariffs)
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            return View(tickets);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existTicket = await _dbContext.Movies
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existTicket == null)
                return NotFound();

            existTicket.IsDeleted = true;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            DateTime dt = DateTime.Today;

            var sessions = await _dbContext.Sessions
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date && x.Start.Hours >= dt.AddMinutes(30).Hour)
            .Include(x => x.Movie)
            .OrderBy(x=>x.Start)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            ViewBag.Seats = await _dbContext.Seats
                .Include(x=>x.Hall.Cinema.Tariffs)
                .Where(x=>x.HallId == sessions[0].HallId)
            .ToListAsync();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Ticket ticket, int selectedSeatId, int selectedSessionId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            DateTime dt = DateTime.Today;

            var sessions = await _dbContext.Sessions
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date && x.Start.Hours >= dt.AddMinutes(30).Hour)
            .Include(x => x.Movie)
            .OrderBy(x=>x.Start)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            ViewBag.Seats = await _dbContext.Seats
                .Include(x => x.Hall.Cinema.Tariffs)
                .Where(x => x.HallId == sessions[0].HallId)
            .ToListAsync();

            if (!ModelState.IsValid)
                return View();

            var existTicket = await _dbContext.Tickets
                .FirstOrDefaultAsync(x => x.Session == ticket.Session && x.Seat == ticket.Seat && x.IsDeleted == false);

            if (existTicket != null)
            {
                ModelState.AddModelError("", "Ticket already exist");
                return View();
            }

            ticket.SeatId = selectedSeatId;
            ticket.Session = await _dbContext.Sessions.FindAsync(selectedSessionId);

            await _dbContext.Tickets.AddAsync(ticket);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [AllowAnonymous]
        public async Task<IActionResult> LoadSelectedHallSeats(int? selectedSessionId)
        {
            if (selectedSessionId == null)
                return Json(null);

            var session = await _dbContext.Sessions.FindAsync(selectedSessionId);

            var seats = await _dbContext.Seats
                .Include(x=>x.Hall.Cinema)
                .Where(x=>x.HallId == session.HallId)
                .ToListAsync();

            return PartialView("_SeatsPartial", seats);
        }

        [AllowAnonymous]
        public async Task<IActionResult> LoadPrice(int? selectedSeatId, int? selectedSessionId)
        {
            if (selectedSeatId == null)
                return Json(null);

            var session = await _dbContext.Sessions
                .Include(x=>x.Hall.Cinema.Tariffs)
                .ThenInclude(x=>x.SeatType)
                .FirstOrDefaultAsync(x=>x.Id == selectedSessionId);

            var seat = await _dbContext.Seats
                .FindAsync(selectedSeatId);

            var price = session.Hall.Cinema.Tariffs?
                .FirstOrDefault(x => x.StartTime <= session.Start 
                && x.EndTime >= session.End 
                && x.StartDayOfWeek <= (int)session.Date.DayOfWeek 
                && x.EndDayOfWeek >= (int)session.Date.DayOfWeek && x.SeatType.Id == seat.SeatTypeId).Price;

            return Json(price);
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existMovie = await _dbContext.Movies
              .Include(x => x.Detail)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

            ViewBag.SelectedActors = await _dbContext.MovieActors.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedDirectors = await _dbContext.MovieDirectors.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedGenres = await _dbContext.MovieGenres.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedFormats = await _dbContext.MovieFormats.Where(x => x.MovieId == id).ToListAsync();

            return View(existMovie);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Movie movie)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != movie.Id)
                return BadRequest();

            var existMovie = await _dbContext.Movies
              .Include(x => x.Detail)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

            ViewBag.SelectedActors = await _dbContext.MovieActors.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedDirectors = await _dbContext.MovieDirectors.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedGenres = await _dbContext.MovieGenres.Where(x => x.MovieId == id).ToListAsync();
            ViewBag.SelectedFormats = await _dbContext.MovieFormats.Where(x => x.MovieId == id).ToListAsync();

            if (!ModelState.IsValid)
                return View(existMovie);

            var isExistMovie = await _dbContext.Movies
                .AnyAsync(x => x.IsDeleted == false && x.Name == movie.Name && x.Detail == movie.Detail && x.Id != id);

            if (isExistMovie)
            {
                ModelState.AddModelError("", "Session already exist");
                return View(existMovie);
            }

            var movieActors = new List<MovieActors>();
            if (movie.ActorsId != null)
            {
                foreach (var item in movie.ActorsId)
                {
                    MovieActors movieActor = new()
                    {
                        MovieId = movie.Id,
                        ActorId = item
                    };
                    movieActors.Add(movieActor);
                }
            }
            var movieDirectors = new List<MovieDirectors>();
            if (movie.DirectorsId != null)
            {
                foreach (var item in movie.DirectorsId)
                {
                    MovieDirectors movieDirector = new()
                    {
                        MovieId = movie.Id,
                        DirectorId = item
                    };
                    movieDirectors.Add(movieDirector);
                }
            }
            var movieGenres = new List<MovieGenres>();
            if (movie.GenresId != null)
            {
                foreach (var item in movie.GenresId)
                {
                    MovieGenres movieGenre = new()
                    {
                        MovieId = movie.Id,
                        GenreId = item
                    };
                    movieGenres.Add(movieGenre);
                }
            }
            var movieFormats = new List<MovieFormats>();
            if (movie.FormatsId != null)
            {
                foreach (var item in movie.FormatsId)
                {
                    MovieFormats movieFormat = new()
                    {
                        MovieId = movie.Id,
                        FormatId = item
                    };
                    movieFormats.Add(movieFormat);
                }
            }

            if (movie.Photo != null)
            {
                if (!movie.Photo.IsImage())
                {
                    ModelState.AddModelError("Photo", $"{movie.Photo.Name} select correct image type.");
                    return View();
                }

                if (!movie.Photo.IsAllowedSize(2))
                {
                    ModelState.AddModelError("Photo", $"{movie.Photo.Name} file size must be max 2Mb.");
                    return View();
                }

                existMovie.Image = FileExtensions.UploadImage(movie.Photo.FileName, movie.Photo.OpenReadStream()).Url.ToString();
            }

            existMovie.Name = movie.Name;
            existMovie.AgeLimit = movie.AgeLimit;
            existMovie.Detail = movie.Detail;
            existMovie.MovieActors = movieActors;
            existMovie.MovieDirectors = movieDirectors;
            existMovie.MovieGenres = movieGenres;
            existMovie.MovieFormats = movieFormats;
            existMovie.IsDeleted = false;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
