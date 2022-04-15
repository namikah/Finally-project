using CinemaPlus.Models.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Movie : TimeStampableObject, IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }

        public int AgeLimit { get; set; }

        [ForeignKey("Detail")]
        public int DetailId { get; set; }

        public Detail Detail { get; set; }

        public ICollection<MovieActors> MovieActors { get; set; }

        public ICollection<MovieDirectors> MovieDirectors { get; set; }

        public ICollection<MovieFormats> MovieFormats { get; set; }

        public ICollection<MovieGenres> MovieGenres { get; set; }

        public bool IsDeleted { get; set; }
    }
}
