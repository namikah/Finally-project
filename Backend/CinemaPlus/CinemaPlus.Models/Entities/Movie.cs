using CinemaPlus.Models.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Movie : IEntity
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }

        [Required]
        public int AgeLimit { get; set; }

        [ForeignKey("Detail")]
        public int DetailId { get; set; }

        public Detail Detail { get; set; }

        public ICollection<MovieActors> MovieActors { get; set; }


        public ICollection<MovieDirectors> MovieDirectors { get; set; }

        public ICollection<MovieFormats> MovieFormats { get; set; }

        public ICollection<MovieLanguages> MovieLanguages { get; set; }

        public ICollection<MovieGenres> MovieGenres { get; set; }

        [NotMapped]
        public List<int> ActorsId { get; set; }

        [NotMapped]
        public List<int> DirectorsId { get; set; }

        [NotMapped]
        public List<int> FormatsId { get; set; }

        [NotMapped]
        public List<int> LanguagesId { get; set; }

        [NotMapped]
        public List<int> GenresId { get; set; }

        public bool IsDeleted { get; set; }
    }
}
