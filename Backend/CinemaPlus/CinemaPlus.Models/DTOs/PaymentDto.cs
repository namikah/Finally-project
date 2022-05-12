namespace CinemaPlus.Models.DTOs
{
    public class PaymentDto
    {
        public string Email { get; set; }

        public string Source { get; set; }

        public long Amount { get; set; }

        public string Currency { get; set; } = "AZN";
    }
}
