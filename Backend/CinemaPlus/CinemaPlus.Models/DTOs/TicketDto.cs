using CinemaPlus.Models.Base;
using CinemaPlus.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.DTOs
{
    public class TicketDto
    {
        public double Price { get; set; }

        public Seat Seat { get; set; }

        public Session Session { get; set; }

        public Customer Customer { get; set; }

        public bool IsDeleted { get; set; }
    }
}
