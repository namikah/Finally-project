using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class MovieLanguages : IEntity
    {
        public int Id { get; set; }

        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        public int LanguageId { get; set; }

        public Language Language { get; set; }
    }
}
