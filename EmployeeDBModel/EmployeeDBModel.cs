using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDBModel
{
    public class EmployeeContext : DbContext
    {

        static string setting = ConfigurationManager.ConnectionStrings["employeeeDBConnection"].ConnectionString;


        public EmployeeContext() : base(setting)
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<EmployeeContext>());
        }

        public DbSet<Employee> Employee { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
