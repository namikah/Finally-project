using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    //[Authorize]
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
