using EmployeeDBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDataModel
{
    public static class EmployeeData
    {
        public static List<Employee> getEmployeeDetails()
        {
            try
            {
                using (var context = new EmployeeContext())
                {
                    return context.Employee.OrderByDescending(x => x.EmployeeID).ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static Employee getEmployeeDetailsById(int id)
        {
            try
            {
                using (var context = new EmployeeContext())
                {
                    return context.Employee.Where(x => x.EmployeeID == id).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int addEmployeeDetails(Employee employee)
        {
            try
            {
                using (var context = new EmployeeContext())
                {
                    context.Employee.Add(employee);
                    context.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int updateEmployeeDetails(Employee employee)
        {
            try
            {
                using (var context = new EmployeeContext())
                {
                    var updateData = context.Employee.Find(employee.EmployeeID);
                    if (updateData != null)
                    {
                        updateData.FirstName = employee.FirstName;
                        updateData.LastName = employee.LastName;
                        updateData.EmailAddress = employee.EmailAddress;
                    }

                    context.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static int deleteEmployeeDetails(int id)
        {
            try
            {
                using (var context = new EmployeeContext())
                {
                    Employee employee = context.Employee.Find(id);
                    context.Employee.Remove(employee);
                    context.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
