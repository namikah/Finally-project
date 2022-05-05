using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CinemaPlus.AdminPanel.Controllers
{
    //[Authorize]
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
