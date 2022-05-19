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

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Create()
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

        //public async Task<IActionResult> Update(int? id)
        //{
        //    if (!User.Identity.IsAuthenticated)
        //        return RedirectToAction("Login", "User");

        //    var existMovie = await _dbContext.Movies
        //      .Include(x => x.Detail)
        //      .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

        //    ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

        //    ViewBag.SelectedActors = await _dbContext.MovieActors.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedDirectors = await _dbContext.MovieDirectors.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedGenres = await _dbContext.MovieGenres.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedFormats = await _dbContext.MovieFormats.Where(x => x.MovieId == id).ToListAsync();

        //    return View(existMovie);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Update(int? id, Movie movie)
        //{
        //    if (!User.Identity.IsAuthenticated)
        //        return RedirectToAction("Login", "User");

        //    if (id == null)
        //        return NotFound();

        //    if (id != movie.Id)
        //        return BadRequest();

        //    var existMovie = await _dbContext.Movies
        //      .Include(x => x.Detail)
        //      .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

        //    ViewBag.Actors = await _dbContext.Actors.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Directors = await _dbContext.Directors.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Genres = await _dbContext.Genres.Where(x => x.IsDeleted == false).ToListAsync();
        //    ViewBag.Formats = await _dbContext.Formats.Where(x => x.IsDeleted == false).ToListAsync();

        //    ViewBag.SelectedActors = await _dbContext.MovieActors.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedDirectors = await _dbContext.MovieDirectors.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedGenres = await _dbContext.MovieGenres.Where(x => x.MovieId == id).ToListAsync();
        //    ViewBag.SelectedFormats = await _dbContext.MovieFormats.Where(x => x.MovieId == id).ToListAsync();

        //    if (!ModelState.IsValid)
        //        return View(existMovie);

        //    var isExistMovie = await _dbContext.Movies
        //        .AnyAsync(x => x.IsDeleted == false && x.Name == movie.Name && x.Detail == movie.Detail && x.Id != id);

        //    if (isExistMovie)
        //    {
        //        ModelState.AddModelError("", "Session already exist");
        //        return View(existMovie);
        //    }

        //    var movieActors = new List<MovieActors>();
        //    if (movie.ActorsId != null)
        //    {
        //        foreach (var item in movie.ActorsId)
        //        {
        //            MovieActors movieActor = new()
        //            {
        //                MovieId = movie.Id,
        //                ActorId = item
        //            };
        //            movieActors.Add(movieActor);
        //        }
        //    }
        //    var movieDirectors = new List<MovieDirectors>();
        //    if (movie.DirectorsId != null)
        //    {
        //        foreach (var item in movie.DirectorsId)
        //        {
        //            MovieDirectors movieDirector = new()
        //            {
        //                MovieId = movie.Id,
        //                DirectorId = item
        //            };
        //            movieDirectors.Add(movieDirector);
        //        }
        //    }
        //    var movieGenres = new List<MovieGenres>();
        //    if (movie.GenresId != null)
        //    {
        //        foreach (var item in movie.GenresId)
        //        {
        //            MovieGenres movieGenre = new()
        //            {
        //                MovieId = movie.Id,
        //                GenreId = item
        //            };
        //            movieGenres.Add(movieGenre);
        //        }
        //    }
        //    var movieFormats = new List<MovieFormats>();
        //    if (movie.FormatsId != null)
        //    {
        //        foreach (var item in movie.FormatsId)
        //        {
        //            MovieFormats movieFormat = new()
        //            {
        //                MovieId = movie.Id,
        //                FormatId = item
        //            };
        //            movieFormats.Add(movieFormat);
        //        }
        //    }

        //    if (movie.Photo != null)
        //    {
        //        if (!movie.Photo.IsImage())
        //        {
        //            ModelState.AddModelError("Photo", $"{movie.Photo.Name} select correct image type.");
        //            return View();
        //        }

        //        if (!movie.Photo.IsAllowedSize(2))
        //        {
        //            ModelState.AddModelError("Photo", $"{movie.Photo.Name} file size must be max 2Mb.");
        //            return View();
        //        }

        //        existMovie.Image = FileExtensions.UploadImage(movie.Photo.FileName, movie.Photo.OpenReadStream()).Url.ToString();
        //    }

        //    existMovie.Name = movie.Name;
        //    existMovie.AgeLimit = movie.AgeLimit;
        //    existMovie.Detail = movie.Detail;
        //    existMovie.MovieActors = movieActors;
        //    existMovie.MovieDirectors = movieDirectors;
        //    existMovie.MovieGenres = movieGenres;
        //    existMovie.MovieFormats = movieFormats;
        //    existMovie.IsDeleted = false;

        //    await _dbContext.SaveChangesAsync();

        //    return RedirectToAction("Index");
        //}
    }
}
