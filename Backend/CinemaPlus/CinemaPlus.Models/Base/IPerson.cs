using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Base
{
    public interface IPerson
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Gender { get; set; }
    }
}
