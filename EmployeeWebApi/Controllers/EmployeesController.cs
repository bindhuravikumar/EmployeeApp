/// <summary>
/// API controller
/// </summary>
namespace EmployeeWebApi.Controllers
{
    using System.Collections.Generic;
    using System.Web.Http;
    using EmployeeDataModel;
    using EmployeeDBModel;

    /// <summary>
    /// Employee controller class
    /// </summary>
    public class EmployeesController : ApiController
    {
        /// <summary>
        /// Method to get the employee details
        /// </summary>
        /// <returns>Returns the list of employee</returns>
        public List<Employee> Get()
        {
            return EmployeeData.getEmployeeDetails();
        }

        /// <summary>
        /// Method to get the details of an employee by their ID
        /// </summary>
        /// <param name="id">Input ID</param>
        /// <returns>Returns the employee object</returns>
        [HttpGet]
        [Route("api/Employees/Details/{id}")]
        public Employee Details(int id)
        {
            return EmployeeData.getEmployeeDetailsById(id);
        }

        /// <summary>
        /// Method to create an employee
        /// </summary>
        /// <param name="employee">Employee object</param>
        /// <returns>Returns the integer</returns>
        [HttpPost]
        [Route("api/Employees/AddEmployee")]
        public int AddEmployee(Employee employee)
        {
            return EmployeeData.addEmployeeDetails(employee);
        }

        /// <summary>
        /// Method to update an employee 
        /// </summary>
        /// <param name="employee">Employee object</param>
        /// <returns>Returns the integer</returns>
        [HttpPut]
        [Route("api/Employees/UpdateEmployee")]
        public int UpdateEmployee(Employee employee)
        {
            return EmployeeData.updateEmployeeDetails(employee);
        }

        /// <summary>
        /// Method to delete an employee
        /// </summary>
        /// <param name="id">Input ID</param>
        /// <returns>Returns the integer</returns>
        [HttpDelete]
        [Route("api/Employees/DeleteEmployee/{id}")]
        public int DeleteEmployee(int id)
        {
            return EmployeeData.deleteEmployeeDetails(id);
        }
    }
}
