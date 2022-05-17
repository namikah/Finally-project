using System.ComponentModel.DataAnnotations;

namespace CinemaPlus.AdminPanel.ViewModels
{
    public class SeatDto
    {
        public int Row { get; set; }

        public int Column { get; set; }

        public int HallId { get; set; }

        public int SeatTypeId { get; set; }
    }
}
