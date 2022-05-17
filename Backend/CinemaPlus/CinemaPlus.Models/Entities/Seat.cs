using CinemaPlus.AdminPanel.ViewModels;
using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Seat : IEntity
    {
        public int Id { get; set; }

        public int Row { get; set; }

        public int Column { get; set; }

        public int HallId { get; set; }

        public Hall Hall { get; set; }

        public int SeatTypeId { get; set; }

        public SeatType SeatType { get; set; }

        [NotMapped]
        public ICollection<SeatDto> SeatDtos { get; set; }
    }
}
