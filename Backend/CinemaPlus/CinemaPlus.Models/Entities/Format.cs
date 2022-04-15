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
    public class Format : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }

        public ICollection<MovieFormats> MovieFormats { get; set; }

        public bool IsDeleted { get; set; }

    }
}
