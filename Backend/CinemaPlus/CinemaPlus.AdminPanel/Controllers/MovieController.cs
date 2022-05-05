using CinemaPlus.Data;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    //[Authorize(Roles = RoleConstants.AdminRole)]
    public class MovieController : Controller
    {
        private readonly AppDbContext _dbContext;

        public MovieController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            var movies = await _dbContext.Movies
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Detail)
                .Include(x => x.MovieActors)
                .ThenInclude(x => x.Actor)
                .OrderByDescending(x=>x.Id)
                .ToListAsync();

            return View(movies);
        }

        public async Task<ActionResult> Detail(int? id)
        {
            if (id == null)
                return NotFound();

            var existMovie = await _dbContext.Movies
               .Include(x => x.Detail)
                .Include(x => x.MovieActors)
                .ThenInclude(x => x.Actor)
                .Include(x => x.MovieGenres)
                .ThenInclude(x => x.Genre)
                 .Include(x => x.MovieDirectors)
                .ThenInclude(x => x.Director)
                  .Include(x => x.MovieFormats)
                .ThenInclude(x => x.Format)
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);

            if (existMovie == null)
                return NotFound();

            return View(existMovie);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var existMovie = await _dbContext.Movies
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existMovie == null)
                return NotFound();

            existMovie.IsDeleted = true;

            var path = Path.Combine(Constants.SeedDataPath, "event", existMovie.Image);
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);

            await _dbContext.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Create()
        {
            ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Movie movie)
        {
            ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
            ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

            if (!ModelState.IsValid)
                return View();

            var isMovieExist = await _dbContext.Movies
                .AnyAsync(x => x.Name.ToLower() == movie.Name.ToLower() && x.IsDeleted == false);

            if (movie.Photo == null || movie.Photo.Length == 0)
            {
                ModelState.AddModelError("Photo", "Upload image.");
                return View();
            }

            if (!movie.Photo.IsImage())
            {
                ModelState.AddModelError("Photo", $"{movie.Photo.Name} Duzgun shekil formati sechin.");
                return View();
            }

            if (!movie.Photo.IsAllowedSize(2))
            {
                ModelState.AddModelError("Photo", $"{movie.Photo.Name} 2Mb-dan artiq ola bilmez.");
                return View();
            }

            var fileName = await movie.Photo.GenerateFile(Path.Combine(Constants.SeedDataPath, "movies"));
            movie.Image = Path.Combine(Constants.SeedDataPath, "movies", fileName);

            var movieActors = new List<MovieActors>();
            if (movie.ActorsId != null)
            {
                foreach (var item in movie.ActorsId)
                {
                    MovieActors movieActor = new MovieActors()
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
                    MovieDirectors movieDirector = new MovieDirectors()
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
                    MovieGenres movieGenre = new MovieGenres()
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
                    MovieFormats movieFormat = new MovieFormats()
                    {
                        MovieId = movie.Id,
                        FormatId = item
                    };
                    movieFormats.Add(movieFormat);
                }
            }

            movie.MovieActors = movieActors; 
            movie.MovieDirectors = movieDirectors;
            movie.MovieGenres = movieGenres;
            movie.MovieFormats = movieFormats;

            await _dbContext.Movies.AddAsync(movie);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //        return NotFound();

        //    var existEvent = await _dbContext.Events
        //        .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
        //    if (existEvent == null)
        //        return NotFound();

        //    existEvent.IsDeleted = true;

        //    var path = Path.Combine(Constants.ImageFolderPath, "event", existEvent.Image);
        //    if (System.IO.File.Exists(path))
        //        System.IO.File.Delete(path);

        //    await _dbContext.SaveChangesAsync();

        //    return RedirectToAction(nameof(Index));
        //}

        //public async Task<IActionResult> Update(int? id)
        //{
        //    var events = await _dbContext.Events
        //      .Include(x => x.EventSpeakers)
        //      .ThenInclude(x => x.Speaker)
        //      .Include(x => x.Category)
        //      .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

        //    var speakers = await _dbContext.Speakers.Where(x => x.IsDeleted == false).ToListAsync();
        //    var categories = await _dbContext.Categories.ToListAsync();
        //    var tags = await _dbContext.Tags.ToListAsync();

        //    ViewBag.Tags = tags;
        //    ViewBag.SelectedTags = await _dbContext.EventTags.Where(x => x.EventId == id).ToListAsync();
        //    ViewBag.SelectedSpeakers = await _dbContext.EventSpeakers.Where(x => x.EventId == id).ToListAsync();
        //    ViewBag.Speakers = speakers;
        //    ViewBag.Categories = categories;

        //    return View(events);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Update(int? id, Event eventM, int selectedCategoryId)
        //{
        //    if (id == null)
        //        return NotFound();

        //    if (id != eventM.Id)
        //        return BadRequest();

        //    var existEvent = await _dbContext.Events
        //      .Include(x => x.EventSpeakers)
        //      .ThenInclude(x => x.Speaker)
        //      .Include(x => x.Category)
        //      .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

        //    var speakers = await _dbContext.Speakers.Where(x => x.IsDeleted == false).ToListAsync();
        //    var categories = await _dbContext.Categories.ToListAsync();
        //    var tags = await _dbContext.Tags.ToListAsync();

        //    ViewBag.Tags = tags;
        //    ViewBag.SelectedTags = await _dbContext.EventTags.Where(x => x.TagId == id).ToListAsync();
        //    ViewBag.SelectedSpeakers = await _dbContext.EventSpeakers.Where(x => x.EventId == id).ToListAsync();
        //    ViewBag.Speakers = speakers;
        //    ViewBag.Categories = categories;

        //    if (!ModelState.IsValid)
        //        return View(existEvent);

        //    var isExistEvent = await _dbContext.Events
        //         .AnyAsync(x => x.Name.ToLower() == eventM.Name.ToLower() && x.IsDeleted == false && x.Id != id);

        //    if (eventM.Photo != null)
        //    {
        //        if (!eventM.Photo.IsImage())
        //        {
        //            ModelState.AddModelError("Photo", $"{eventM.Photo.Name} select image type.");
        //            return View(existEvent);
        //        }

        //        if (!eventM.Photo.IsAllowedSize(2))
        //        {
        //            ModelState.AddModelError("Photo", $"{eventM.Photo.Name} 2Mb-max size of file.");
        //            return View(existEvent);
        //        }

        //        var path = Path.Combine(Constants.ImageFolderPath, "event", existEvent.Image);
        //        if (System.IO.File.Exists(path))
        //            System.IO.File.Delete(path);

        //        var fileName = await eventM.Photo.GenerateFile(Path.Combine(Constants.ImageFolderPath, "event"));
        //        eventM.Image = fileName;
        //        existEvent.Image = eventM.Image;
        //    }

        //    var eventSpeakers = new List<EventSpeakers>();
        //    if (eventM.SpeakersId != null)
        //    {
        //        foreach (var item in eventM.SpeakersId)
        //        {
        //            EventSpeakers eventSpeaker = new EventSpeakers()
        //            {
        //                EventId = eventM.Id,
        //                SpeakerId = item,
        //            };
        //            eventSpeakers.Add(eventSpeaker);
        //        }
        //    }

        //    var eventTags = new List<EventTags>();
        //    if (eventM.TagsId != null)
        //    {
        //        foreach (var item in eventM.TagsId)
        //        {
        //            EventTags eventTag = new EventTags()
        //            {
        //                EventId = eventM.Id,
        //                TagId = item
        //            };
        //            eventTags.Add(eventTag);
        //        }
        //    }

        //    existEvent.EventTags = eventTags;
        //    existEvent.EventSpeakers = eventSpeakers;
        //    existEvent.Name = eventM.Name;
        //    existEvent.Date = eventM.Date;
        //    existEvent.Duration = eventM.Duration;
        //    existEvent.Venue = eventM.Venue;
        //    existEvent.Context = eventM.Context;
        //    existEvent.IsDeleted = false;
        //    existEvent.CategoryId = selectedCategoryId;

        //    await _dbContext.SaveChangesAsync();

        //    return RedirectToAction("Index");
        //}


    }
}
