using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Tariff : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        public int FormatId { get; set; }

        public Format Format { get; set; }

        [Required]
        public double Price { get; set; }

        public int CinemaId { get; set; }

        public Cinema Cinema { get; set; }

        [Required]
        public int StartDayOfWeek { get; set; }

        [Required]
        public int EndDayOfWeek { get; set; }

        public string AudioFormat { get; set; }

        public SeatType SeatType { get; set; }

        public bool IsDeleted { get; set; }
    }
}
