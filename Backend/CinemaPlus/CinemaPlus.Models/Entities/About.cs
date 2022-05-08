using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class About : IEntity
    {
        public int Id { get; set; }

        public string SubTitle { get; set; }
    }
}
