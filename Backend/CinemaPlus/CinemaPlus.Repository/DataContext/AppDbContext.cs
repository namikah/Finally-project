using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CinemaPlus.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Repository.DataContext
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<Actor> Actors { get; set; }

        public DbSet<Detail> Details { get; set; }

        public DbSet<Director> Directors { get; set; }

        public DbSet<Format> Formats { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<MovieActors> MovieActors { get; set; }

        public DbSet<MovieDirectors> MovieDirectors { get; set; }

        public DbSet<MovieFormats> MovieFormats { get; set; }

        public DbSet<MovieGenres> MovieGenres { get; set; }

        public DbSet<Cinema> Cinemas { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Hall> Halls { get; set; }

        public DbSet<Session> Sessions { get; set; }

        public DbSet<News> News { get; set; }

        public DbSet<Tariff> Tariffs { get; set; }
        public DbSet<CinemaImage> CinemaImages { get; set; }
    }
}
