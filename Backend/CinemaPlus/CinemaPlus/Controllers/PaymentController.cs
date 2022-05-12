using CinemaPlus.Models.DTOs;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.Repository.Contracts;
using CinemaPlus.Services.Services;
using CinemaPlus.Services.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaPlus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public PaymentController()
        {
            StripeConfiguration.ApiKey = "sk_test_51KyIycFgS0jlrauJlfyFce8iGFWPbBJHC0ETiFr1gWj0NX4Isd8UwvYorEOquo4bZDHTsrx1n2oCk8Yj4egYJb9z000pEDoOUf";
        }

        [HttpPost]
        public IActionResult Post([FromBody] Payment paymentDetails)
        {
            //var paymentDetails = payment;

            //paymentDetails.Amount = 678 * 100;

            #region Create Customer
            var customerOption = new CustomerCreateOptions
            {
                Name = paymentDetails.Email,
                Email = paymentDetails.Email,
                Source = paymentDetails.Source
            };

            var customerService = new CustomerService();
            var customer = customerService.Create(customerOption);
            #endregion

            #region Create Payment
            var paymentOptions = new PaymentIntentCreateOptions
            {
                Amount = paymentDetails.Amount,
                Currency = paymentDetails.Currency,
                PaymentMethod = "pm_card_visa",
                Customer = customer.Id,
                ReceiptEmail = paymentDetails.Email
            };
            var paymentService = new PaymentIntentService();
            var paymentIntent = paymentService.Create(paymentOptions);
            #endregion

            #region Confirm Payment
            var confirmOption = new PaymentIntentConfirmOptions
            {
                PaymentMethod = paymentOptions.PaymentMethod,
            };
            var confirmService = new PaymentIntentService();
            var confirmIntent = confirmService.Confirm(paymentIntent.Id, confirmOption);
            #endregion

            return Ok(confirmIntent);
        }
    }
}
