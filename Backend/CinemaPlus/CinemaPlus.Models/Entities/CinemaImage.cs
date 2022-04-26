using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class CinemaImage : IEntity
    {
        public int Id { get; set; }

        public string Image { get; set; }

        public int CinemaId { get; set; }

        public Cinema Cinema { get; set; }
    }
}
