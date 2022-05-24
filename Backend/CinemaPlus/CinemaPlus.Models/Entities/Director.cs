﻿using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Director : IPerson
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Gender { get; set; }

        public ICollection<MovieDirectors> MovieDirectors { get; set; }

        public bool IsDeleted { get; set; }

    }
}
