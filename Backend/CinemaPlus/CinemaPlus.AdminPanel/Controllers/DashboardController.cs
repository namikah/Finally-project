using CinemaPlus.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login","User");

            return View();
        }
    }
}
