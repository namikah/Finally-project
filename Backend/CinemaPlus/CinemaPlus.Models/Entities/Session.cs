using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Session : IEntity
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan Start { get; set; }

        [Required]
        public TimeSpan End { get; set; }

        public int? FormatId { get; set; }

        public Format Format { get; set; }

        public int? LanguageId { get; set; }

        public Language Language { get; set; }

        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        public int HallId { get; set; }

        public Hall Hall { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        
        public bool IsDeleted { get; set; }
    }
}
