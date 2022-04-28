using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class SeatType : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Seat> Seats { get; set; }
    }
}
