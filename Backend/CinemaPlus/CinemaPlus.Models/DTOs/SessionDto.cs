using CinemaPlus.Models.Base;
using CinemaPlus.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.DTOs
{
    public class SessionDto
    {
        public DateTime Date { get; set; }

        public TimeSpan Start { get; set; }

        public TimeSpan End { get; set; }

        public ICollection<SessionFormats> SessionFormats { get; set; }

        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        public int HallId { get; set; }

        public Hall Hall { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        
        public bool IsDeleted { get; set; }
    }
}
