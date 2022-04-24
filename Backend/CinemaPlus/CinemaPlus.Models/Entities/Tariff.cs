using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Tariff : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public int FormatId { get; set; }

        public Format Format { get; set; }

        public double Price { get; set; }

        public int CinemaId { get; set; }

        public Cinema Cinema { get; set; }

        public int StartDayOfWeek { get; set; }

        public int EndDayOfWeek { get; set; }
    }
}
