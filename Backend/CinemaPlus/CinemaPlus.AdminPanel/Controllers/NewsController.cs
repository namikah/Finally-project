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
    public class NewsController : Controller
    {
        private readonly AppDbContext _dbContext;

        public NewsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var news = await _dbContext.News
                .Where(x => x.IsDeleted == false)
                .Include(x => x.Medias)
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            return View(news);
        }

        public async Task<ActionResult> Detail(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existNews = await _dbContext.News
               .Include(x => x.Medias)
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);

            if (existNews == null)
                return NotFound();

            return View(existNews);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            var existNews = await _dbContext.News
                .FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == false);
            if (existNews == null)
                return NotFound();

            existNews.IsDeleted = true;

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
        public async Task<IActionResult> Create(News news)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (!ModelState.IsValid)
                return View();

            var mediaList = new List<NewsMedia>();
            if (news.Photos != null)
            {

                foreach (var photo in news.Photos)
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
                    var newsMedia = new NewsMedia()
                    {
                        Name = "photo",
                        Url = FileExtensions.UploadImage(photo.FileName, photo.OpenReadStream()).Url.ToString()
                    };
                    mediaList.Add(newsMedia);
                }
            }

            if (news.Video != null)
            {
                var media = new NewsMedia()
                {
                    Name = "video",
                    Url = news.Video
                };
                mediaList.Add(media);
            }

            news.Medias = mediaList;

            await _dbContext.News.AddAsync(news);
            await _dbContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Update(int? id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            var existNews = await _dbContext.News
              .Include(x => x.Medias)
              .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);


            return View(existNews);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int? id, News news)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login", "User");

            if (id == null)
                return NotFound();

            if (id != news.Id)
                return BadRequest();

            var existNews = await _dbContext.News
               .Include(x => x.Medias)
               .FirstOrDefaultAsync(x => x.IsDeleted == false && x.Id == id);

            if (!ModelState.IsValid)
                return View(existNews);

            var mediaList = new List<NewsMedia>();
            if (news.Photos != null)
            {
                foreach (var photo in news.Photos)
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
                    var newsMedia = new NewsMedia()
                    {
                        Name = "photo",
                        Url = FileExtensions.UploadImage(photo.FileName, photo.OpenReadStream()).Url.ToString()
                    };
                    mediaList.Add(newsMedia);
                }
            }

            if (existNews.Medias != null && existNews.Medias.Count != 0)
            {
                foreach (var item in existNews.Medias.ToList())
                {
                    mediaList.Add(item);
                }
            }

            if (news.Video != null)
            {
                var media = new NewsMedia()
                {
                    Name = "video",
                    Url = news.Video
                };
                mediaList.Add(media);
            }


            existNews.Medias = mediaList;
            existNews.Date = news.Date;
            existNews.Title = news.Title;
            existNews.Snippet = news.Snippet;
            existNews.Description = news.Description;
            existNews.IsDeleted = false;

            await _dbContext.SaveChangesAsync();

            var result = await _dbContext.News
               .Where(x => x.IsDeleted == false)
               .Include(x => x.Medias)
               .OrderByDescending(x => x.Id)
               .ToListAsync();

            return RedirectToAction("Index", result);
        }
    }
}
