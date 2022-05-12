using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Payment : IEntity
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Source { get; set; }

        public long Amount { get; set; }

        public string Currency { get; set; } = "AZN";
    }
}
