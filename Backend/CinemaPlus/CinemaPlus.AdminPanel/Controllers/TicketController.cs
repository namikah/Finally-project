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

            var existTicket = await _dbContext.Tickets
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existTicket == null)
                return NotFound();

            existTicket.IsDeleted = true;

            await _dbContext.SaveChangesAsync();

            return Json(new { status = true });
        }

        public async Task<IActionResult> Create()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            DateTime dt = DateTime.Today;

            var sessions = await _dbContext.Sessions
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date)
            .Include(x => x.Movie)
            .Include(x => x.Hall.Cinema)
            .OrderBy(x => x.Start)
            .OrderBy(x => x.Hall.Cinema)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            ViewBag.Tickets = await _dbContext.Tickets
            .Where(x => x.IsDeleted == false && x.Session.Date >= dt.Date)
            .Include(x => x.Seat)
            .Include(x => x.Session)
            .ToListAsync();

            ViewBag.Seats = await _dbContext.Seats
            .Include(x => x.Hall.Cinema.Tariffs)
            .Include(x => x.SeatType)
            .Where(x => sessions.Count > 0 && x.HallId == sessions[0].HallId)
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
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date)
            .Include(x => x.Movie)
            .OrderBy(x => x.Start)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            ViewBag.Tickets = await _dbContext.Tickets
            .Where(x => x.IsDeleted == false && x.Session.Date >= dt.Date)
            .Include(x => x.Seat)
            .Include(x => x.Session)
            .ToListAsync();

            ViewBag.Seats = await _dbContext.Seats
            .Include(x => x.Hall.Cinema.Tariffs)
            .Where(x => sessions.Count > 0 && x.HallId == sessions[0].HallId)
            .ToListAsync();

            if (!ModelState.IsValid)
                return View();

            var existTicket = await _dbContext.Tickets.FirstOrDefaultAsync(x => x.SessionId == selectedSessionId && x.SeatId == selectedSeatId && x.IsDeleted == false);
            if (existTicket != null)
            {
                ModelState.AddModelError("", "Ticket already exist");
                return View();
            }

            var isExistTicket = await _dbContext.Tickets
                .AnyAsync(x => x.Session.Id == selectedSessionId && x.SeatId == selectedSeatId && x.IsDeleted == false);

            if (isExistTicket)
            {
                ModelState.AddModelError("", "Ticket already exist");
                return View();
            }

            ticket.SeatId = selectedSeatId;
            ticket.Session = await _dbContext.Sessions.FindAsync(selectedSessionId);
            ticket.IsConfirmed = true;
            ticket.IsDeleted = false;

            await _dbContext.Tickets.AddAsync(ticket);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [AllowAnonymous]
        public async Task<IActionResult> LoadSelectedHallSeats(int? selectedSessionId)
        {
            if (selectedSessionId == null)
                return Json(null);

            ViewBag.Tickets = await _dbContext.Tickets
            .Where(x => x.IsDeleted == false)
            .Include(x => x.Seat)
            .Include(x => x.Session)
            .ToListAsync();

            var session = await _dbContext.Sessions.FindAsync(selectedSessionId);

            ViewBag.Session = session;

            var seats = await _dbContext.Seats
                .Include(x => x.Hall.Cinema)
                .Include(x => x.SeatType)
                .Where(x => session != null && x.HallId == session.HallId)
                .ToListAsync();

            return PartialView("_SeatsPartial", seats);
        }

        [AllowAnonymous]
        public async Task<IActionResult> LoadPrice(int? selectedSeatId, int? selectedSessionId)
        {
            if (selectedSeatId == null)
                return Json(null);

            var session = await _dbContext.Sessions
                .Include(x => x.Hall.Cinema.Tariffs)
                .ThenInclude(x => x.SeatType)
                .FirstOrDefaultAsync(x => x.Id == selectedSessionId);

            var seat = await _dbContext.Seats
                .Include(x => x.Hall.Cinema)
                .Include(x => x.SeatType)
                .FirstOrDefaultAsync(x => x.Id == selectedSeatId);

            var dayOfWeek = Convert.ToInt32(session.Date.DayOfWeek == 0 ? 7 : session.Date.DayOfWeek);

            var price = session.Hall.Cinema.Tariffs?
                .FirstOrDefault(x => x.StartTime <= session.Start
                && x.EndTime >= session.End
                && x.StartDayOfWeek <= dayOfWeek
                && x.EndDayOfWeek >= dayOfWeek
                && x.FormatId == session.FormatId
                && (seat != null && x.SeatType.Id == seat.SeatTypeId)).Price;

            return Json(price);
        }

        [AllowAnonymous]
        public async Task<IActionResult> LoadHallPlan(int? selectedSessionId)
        {
            var session = await _dbContext.Sessions.FindAsync(selectedSessionId);

            var hall = await _dbContext.Halls
                .Include(x => x.Seats.OrderBy(x => x.Column))
                .ThenInclude(x => x.SeatType)
                .FirstOrDefaultAsync(x => session != null && x.Id == session.HallId);

            ViewBag.Tickets = await _dbContext.Tickets
                .Where(x => x.IsDeleted == false)
                 .Include(x => x.Session)
                 .Include(x => x.Seat)
                 .ToListAsync();

            ViewBag.SessionId = selectedSessionId;

            return PartialView("_HalPlanPartial", hall);
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            DateTime dt = DateTime.Today;
            var sessions = await _dbContext.Sessions
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date)
            .Include(x => x.Movie)
            .OrderBy(x => x.Start)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            var tickets = await _dbContext.Tickets
                .Where(x => x.IsDeleted == false && x.Session.Date >= dt.Date)
            .Include(x => x.Seat)
            .Include(x => x.Session)
            .ToListAsync();
            ViewBag.Tickets = tickets;

            var selectedTicket = tickets.FirstOrDefault(x => x.Id == id);

            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(x => x.Id == selectedTicket.Session.Id);

            ViewBag.Seats = await _dbContext.Seats
            .Include(x => x.Hall.Cinema.Tariffs)
            .Include(x => x.SeatType)
            .Where(x => session != null && x.HallId == session.HallId)
            .ToListAsync();


            var existTicket = await _dbContext.Tickets
                .Include(x => x.Customer)
                .Include(x => x.Session)
                .Include(x => x.Seat)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            return View(existTicket);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, Ticket ticket, int selectedSessionId, int selectedSeatId)
        {
            if (id == null)
                return NotFound();

            if (id != ticket.Id)
                return BadRequest();


            DateTime dt = DateTime.Today;
            var sessions = await _dbContext.Sessions
            .Where(x => x.IsDeleted == false && x.Date >= dt.Date)
            .Include(x => x.Movie)
            .OrderBy(x => x.Start)
            .ToListAsync();
            ViewBag.Sessions = sessions;

            var tickets = await _dbContext.Tickets
            .Where(x => x.IsDeleted == false && x.Session.Date >= dt.Date)
            .Include(x => x.Seat)
            .Include(x => x.Session)
            .ToListAsync();
            ViewBag.Tickets = tickets;

            var selectedTicket = tickets.FirstOrDefault(x => x.Id == id);

            var session = await _dbContext.Sessions
                .FirstOrDefaultAsync(x => x.Id == selectedTicket.Session.Id);

            ViewBag.Seats = await _dbContext.Seats
            .Include(x => x.Hall.Cinema.Tariffs)
            .Include(x => x.SeatType)
            .Where(x => session != null && x.HallId == session.HallId)
            .ToListAsync();


            var existTicket = await _dbContext.Tickets
                .Include(x => x.Customer)
                .Include(x => x.Session)
                .Include(x => x.Seat)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            if (!ModelState.IsValid)
                return View(existTicket);

            var isExistTicket = await _dbContext.Tickets
                .AnyAsync(x => x.IsDeleted == false && x.Session.Id == selectedSessionId
                && x.SeatId == selectedSeatId && x.Id != id);

            if (isExistTicket)
            {
                ModelState.AddModelError("", "Ticket already exist");
                return View(existTicket);
            }

            var existSession = await _dbContext.Sessions.FirstOrDefaultAsync(x => x.Id == selectedSessionId && x.IsDeleted == false);
            var existSeat = await _dbContext.Seats.FirstOrDefaultAsync(x => x.Id == selectedSeatId);

            if (existSession == null || existSeat == null)
            {
                ModelState.AddModelError("", "Incorrect selection");
                return View(existSession);
            }

            existTicket.Session = existSession;
            existTicket.Seat = existSeat;
            existTicket.Customer = ticket.Customer;
            existTicket.IsDeleted = false;

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
