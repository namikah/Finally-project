﻿using CinemaPlus.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlus.Models.Entities
{
    public class Detail : IEntity
    {
        public int Id { get; set; }

        public string Country { get; set; }

        public int Duration { get; set; }

        public string Trailer { get; set; }

        public bool IsDeleted { get; set; }

    }
}