using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ReactORTanstack_Query.API.Models.DTOs.Employee
{
    public class EmployeeUpdateDto
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        [ValidateNever]
        public string ImagePath { get; set; }
        public IFormFile ImageFile { get; set; }
        public int DepartmentId { get; set; }
    }
}
