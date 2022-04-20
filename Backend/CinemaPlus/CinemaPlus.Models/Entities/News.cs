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
    public class News : IEntity
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Image { get; set; }

        [NotMapped]
        public IFormFile Photo { get; set; }

        public string Snippet { get; set; }

        public string Description { get; set; }

        public string Trailer { get; set; }
    }
}
