using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace ReactORTanstack_Query.API.Models.DTOs.Employee
{
    public class EmployeeCreateDto
    {
        [Required]
        [MinLength(5)]
        public string FullName { get; set; }
        [Required]
        public string Position { get; set; }
        [Required]
        public decimal Salary { get; set; }
        [ValidateNever]
        public string ImagePath { get; set; }
        [Required]
        public IFormFile ImageFile { get; set; }

        public int? DepartmentId { get; set; } 
    }
}
