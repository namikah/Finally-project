using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Rule : IEntity
    {
        public int Id { get; set; }

        public string Subtitle { get; set; }

        public bool IsMain { get; set; }

        public int? ParentId { get; set; }

        public Rule Parent { get; set; }

        public bool IsDeleted { get; set; }
    }
}
