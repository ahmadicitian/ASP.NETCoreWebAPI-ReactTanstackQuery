using Microsoft.EntityFrameworkCore;
using ReactORTanstack_Query.API.Models.Domain;

namespace ReactORTanstack_Query.API.Data
{
    public class ReactQueryDbContext : DbContext
    {
        public ReactQueryDbContext(DbContextOptions<ReactQueryDbContext> options) : base(options)
        {
        }
        public DbSet<Employee> tblEmployees { get; set; }
        public DbSet<Department> tblDeparments { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Configuring the relationship between Employee and Department
        //    modelBuilder.Entity<Employee>()
        //        .HasOne<Department>()
        //        .WithMany()
        //        .HasForeignKey(e => e.DepartmentId)
        //    // Set to null when the related department is deleted
        //        .OnDelete(DeleteBehavior.SetNull); 

        //    base.OnModelCreating(modelBuilder);
        //}

    }
}
