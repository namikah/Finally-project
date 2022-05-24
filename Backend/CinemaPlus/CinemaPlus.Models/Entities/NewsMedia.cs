using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class NewsMedia : IEntity
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Url { get; set; }

        public int NewsId { get; set; }

        public News News { get; set; }
    }
}
