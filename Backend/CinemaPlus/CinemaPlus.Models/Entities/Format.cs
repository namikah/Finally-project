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
    public class Format : IEntity
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Icon { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }

        public ICollection<MovieFormats> MovieFormats { get; set; }

        public ICollection<Session> Sessions { get; set; }

        public ICollection<Tariff> Tariffs { get; set; }

        public bool IsDeleted { get; set; }

    }
}
