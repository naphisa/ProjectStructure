using Microsoft.AspNetCore.Identity;

namespace ProjectStructure.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        //public string Username { get; set; }
        //public string PasswordHash { get; set; } // store hashed passwords!

    }
}
