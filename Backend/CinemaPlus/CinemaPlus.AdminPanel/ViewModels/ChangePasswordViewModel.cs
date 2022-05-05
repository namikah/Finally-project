using System.ComponentModel.DataAnnotations;

namespace CinemaPlus.AdminPanel.ViewModels
{
    public class ChangePasswordViewModel
    {
        [Required, DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [Required, DataType(DataType.Password)]
        public string Password { get; set; }

        [Required, DataType(DataType.Password), Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
