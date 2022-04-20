using CinemaPlus.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.DTOs
{
    public class PaginationDto<T>
    {
        public int Page { get; set; }

        public int PerPage { get; set; }

        public int Total { get; set; }

        public decimal TotalPage { get; set; }

        public ICollection<T> Data { get; set; }
    }
}
