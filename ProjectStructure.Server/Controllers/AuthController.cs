using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProjectStructure.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LoginRequest = ProjectStructure.Server.Models.LoginRequest;
using RegisterRequest = ProjectStructure.Server.Models.RegisterRequest;

namespace ProjectStructure.Server.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly List<User> Users = new List<User>();
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager,
                      SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            //var key = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(
                loginRequest.Username,
                loginRequest.Password,
                false,//loginRequest.RememberMe,
                lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok("Login successful");
            }
            //else if (result.IsLockedOut), if it were an async method
            else if (result.IsLockedOut)
            {
                return Forbid("User account locked out.");
            }
            else
            {
                return Unauthorized("Invalid login attempt.");
            }

            //var claims = new[]
            //{
            //new Claim(ClaimTypes.Name, loginRequest.Username)
            //};

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]));
            //var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //var expiry = DateTime.Now.AddMinutes(Convert.ToDouble(_config["JwtSettings:ExpiryMinutes"]));

            //var token = new JwtSecurityToken(
            //    issuer: _config["JwtSettings:Issuer"],
            //    audience: _config["JwtSettings:Audience"],
            //    claims: claims,
            //    expires: expiry,
            //    signingCredentials: creds
            //);

            //return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }


        [Authorize]
        [HttpGet("secure")]
        public IActionResult GetSecret()
        {
            return Ok("This is protected data.");
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            //check if user exists
            var existingUser = _userManager.FindByEmailAsync(model.Username);

            if (existingUser.IsCompletedSuccessfully)
                return BadRequest("Username already exists");
            var user = new ApplicationUser { UserName = model.Username, Email = model.Username, FullName = model.Fullname};
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            //await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok();
        }


        public class User
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

    }
}
