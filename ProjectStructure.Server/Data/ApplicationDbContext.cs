using Microsoft.EntityFrameworkCore;
using ProjectStructure.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ProjectStructure.Server.Data
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Your other DbSets
        public DbSet<Product> Products { get; set; }
    }
}
