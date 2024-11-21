using System.ComponentModel.DataAnnotations;

namespace ReactORTanstack_Query.API.Models.DTOs.Department
{
    public class DepartmentCreateDto
    {
        [Required(ErrorMessage ="Department Name is Required")]
        [MaxLength(30, ErrorMessage = "The Department Name should not exceed 30 characters.")]
        [MinLength(2,ErrorMessage = "The Department Name Should be at least 2 Characters.")]
        public string Name { get; set; }
    }
}
