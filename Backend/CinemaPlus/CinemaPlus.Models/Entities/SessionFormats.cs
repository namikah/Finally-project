using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class SessionFormats : IEntity
    {
        public int Id { get; set; }

        public int SessionId { get; set; }

        public Session Session { get; set; }

        public int FormatId { get; set; }

        public Format Format { get; set; }
    }
}
