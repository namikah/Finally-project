using AutoMapper;
using CinemaPlus.AdminPanel.ViewModels;
using CinemaPlus.Data;
using CinemaPlus.Models.Entities;
using CinemaPlus.Repository.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BackendProject.Areas.AdminPanel.Controllers
{
    [Authorize(Roles = RoleConstants.AdminRole)]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _dbContext;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager = null, AppDbContext dbContext = null, SignInManager<User> signInManager = null)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            if(!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            var users = await _userManager.Users.ToListAsync();
            var roles = await _roleManager.Roles.ToListAsync();
            var UserRoles = await _dbContext.UserRoles.ToListAsync();

            return View(new UserViewModel()
            {
                Users = users,
                Roles = roles,
                UserRoles = UserRoles
            });
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index");

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid)
                return View(loginViewModel);

            var isExistUser = await _userManager.FindByNameAsync(loginViewModel.Username);
            if (isExistUser == null)
            {
                ModelState.AddModelError("", "Username or password incorrect");
                return View(loginViewModel);
            }

            if (isExistUser.IsActive == false)
            {
                ModelState.AddModelError("", "Access denied");
                return View(loginViewModel);
            }

            var result = await _signInManager.PasswordSignInAsync(isExistUser, loginViewModel.Password, loginViewModel.RememberMe, false);
            if (!result.Succeeded)
            {
                ModelState.AddModelError("", "Username or password incorrect");
                return View(loginViewModel);
            }

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Login");
        }

        public IActionResult AddUser()
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUser(RegisterViewModel registerViewModel)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
            {
                return View(registerViewModel);
            }

            var existUser = await _userManager.FindByNameAsync(registerViewModel.Username);
            if (existUser != null)
            {
                ModelState.AddModelError("Username", "Allready exist username");
                return View(registerViewModel);
            }

            var user = new User()
            {
                FullName = registerViewModel.Fullname,
                UserName = registerViewModel.Username,
                Email = registerViewModel.Email,
                IsActive = false
            };

            var result = await _userManager.CreateAsync(user, registerViewModel.Password);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                }
                return View(registerViewModel);
            }

            result = await _userManager.AddToRoleAsync(user, RoleConstants.UserRole);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                }
                return View(registerViewModel);
            }

            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            result = await _userManager.ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                }
                return View(registerViewModel);
            }

            return RedirectToAction("Index", "User");
        }

        public async Task<IActionResult> ChangePassword(string id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            var isExistUser = await _userManager.FindByIdAsync(id);
            if (isExistUser == null)
                return NotFound();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(string id, ChangePasswordViewModel changePasswordVM)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Incorrect");
                return View(changePasswordVM);
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var isOldPassword = await _userManager.CheckPasswordAsync(user, changePasswordVM.OldPassword);
            if (!isOldPassword)
                return BadRequest();

            var result = await _userManager.ChangePasswordAsync(user, changePasswordVM.OldPassword, changePasswordVM.Password);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                    return View();
                }
            }

            return RedirectToAction(nameof(Index));
        }


        public async Task<IActionResult> ChangeRole(string id)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var allRoles = await _roleManager.Roles.ToListAsync();

            ViewBag.AllRoles = allRoles;

            var roles = await _userManager.GetRolesAsync(user);
            ViewBag.CurrentRoleName = roles.FirstOrDefault();

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangeRole(string id, RoleManagerViewModel roleManagerVM, int? courseId)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("", "Incorrect");
                return View(roleManagerVM);
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var oldRoles = await _userManager.GetRolesAsync(user);
            foreach (var item in oldRoles)
            {
                await _userManager.RemoveFromRoleAsync(user, item);
            }

            var newRole = _roleManager.Roles.FirstOrDefault(x => x.Id == roleManagerVM.RoleId);
            if (newRole == null)
            {
                ModelState.AddModelError("", "Please choose correct role");
                return View(roleManagerVM);
            }

            var result = await _userManager.AddToRoleAsync(user, newRole.Name);
            if (!result.Succeeded)
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError("", item.Description);
                }
                return View(roleManagerVM);
            }

            if (user.UserName == User.Identity.Name)
            {
                await _signInManager.SignOutAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> ChangeIsActive(string id, bool isActive)
        {
            if (!User.Identity.IsAuthenticated)
                return RedirectToAction("Login");

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            if (isActive)
                user.IsActive = false;
            else
                user.IsActive = true;

            await _userManager.UpdateAsync(user);

            return RedirectToAction(nameof(Index));
        }
    }
}
