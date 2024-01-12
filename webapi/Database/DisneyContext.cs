using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Database.Configuration;
using webapi.Database.Models;

namespace webapi.Database
{
    public class DisneyContext : IdentityDbContext<User>
    {
        public DisneyContext(DbContextOptions<DisneyContext> options) : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Card>().ToTable("Card");
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
