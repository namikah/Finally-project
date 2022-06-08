using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Language : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ShortName { get; set; }

        public string Icon { get; set; }

        public ICollection<MovieLanguages> MovieLanguages { get; set; }

        public ICollection<Session> Sessions { get; set; }
    }
}
