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
    public class Cinema : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string WorkTime { get; set; }

        public ICollection<CinemaImage> Images { get; set; }

        [NotMapped]
        public ICollection<IFormFile> Photos { get; set; }

        public ICollection<Hall> Halls { get; set; }

        public ICollection<Tariff> Tariffs { get; set; }

        public string TarifUrl { get; set; }

        public string MarketingMail { get; set; }

        public string MapUrl { get; set; }
    }
}
