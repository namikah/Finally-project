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

        public DbSet<Movie> Movies { get; }

        public DbSet<Actor> Actors { get; }

        public DbSet<Detail> Details { get; }

        public DbSet<Director> Directors { get; }

        public DbSet<Format> Formats { get; }

        public DbSet<Genre> Genres { get; }

        public DbSet<MovieActors> MovieActors { get; }

        public DbSet<MovieDirectors> MovieDirectors { get; }

        public DbSet<MovieFormats> MovieFormats { get; }

        public DbSet<MovieGenres> MovieGenres { get; }

        public DbSet<Cinema> Cinemas { get; }

        public DbSet<Customer> Customers { get; }

        public DbSet<Hall> Halls { get; }

        public DbSet<Session> Sessions { get; }
    }
}
