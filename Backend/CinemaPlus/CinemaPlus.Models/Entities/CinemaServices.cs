using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class CinemaServices : IEntity
    {
        public int Id { get; set; }

        public string Image { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }

        public string Note { get; set; }
    }
}
