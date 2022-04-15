﻿using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Genre :IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<MovieGenres> MovieGenres { get; set; }

        public bool IsDeleted { get; set; }

    }
}
