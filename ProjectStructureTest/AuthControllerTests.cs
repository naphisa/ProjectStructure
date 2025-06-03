using Xunit;
using ProjectStructure.Server;
using Microsoft.AspNetCore.Mvc;
using ProjectStructure;
using ProjectStructure.Server.Controllers;
using Assert = Xunit.Assert;
using Microsoft.AspNetCore.Identity;
using ProjectStructure.Server.Models;
using Microsoft.Extensions.Configuration;
using static ProjectStructure.Server.Controllers.AuthController;

namespace ProjectStructureTest.Tests
{
    public class AuthControllerTests
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly List<User> Users = new List<User>();
        private readonly IConfiguration _config;

        public AuthControllerTests(UserManager<ApplicationUser> userManager,
                      SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }
        //[SetUp]
        //public void Setup()
        //{
        //}

        //[Test]
        //public void Test1()
        //{
        //    Assert.Pass();
        //}
        [Fact]
        public void Register_ValidUser_ReturnsOk()
        {
            // Arrange
            var controller = new AuthController(_userManager, _signInManager, _config);
            var model = new RegisterRequest
            {
                Username = "newuser@example.com",
                Password = "Password123!",
                ConfirmPassword = "Password123!",
                Fullname = "New User"
            };

            // Act
            var result = controller.Register(model);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User registered successfully", okResult.Value);
        }

        [Fact]
        public void Register_ExistingUser_ReturnsBadRequest()
        {
            var controller = new AuthController(_userManager, _signInManager, _config);
            var model = new RegisterRequest
            {
                Username = "exists@example.com",
                Password = "Password123!",
                ConfirmPassword = "Password123!",
                Fullname = "Existing User"
            };

            var result = controller.Register(model);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("User already exists", badRequest.Value);
        }
    }
}
