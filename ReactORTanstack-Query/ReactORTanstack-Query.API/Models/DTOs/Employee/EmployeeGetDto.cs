using ReactORTanstack_Query.API.Models.DTOs.Department;

namespace ReactORTanstack_Query.API.Models.DTOs.Employee
{
    public class EmployeeGetDto
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        public string ImagePath { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }  
        // Avoid circular reference, include only necessary department info
    }
}
