using CinemaPlus.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CinemaPlus.AdminPanel.ViewModels
{
    public class UserViewModel
    {
        public List<User> Users { get; set; }

        public List<IdentityRole> Roles { get; set; }

        public List<IdentityUserRole<string>> UserRoles { get; set; }

    }
}
