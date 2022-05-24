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
    public class Ticket :IEntity
    {
        public int Id { get; set; }

        [Required]
        public double Price { get; set; }

        public int? SessionId { get; set; }

        public Session Session { get; set; }

        [ForeignKey("Seat")]
        public int SeatId { get; set; }

        public Seat Seat { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsConfirmed { get; set; }
    }
}
