using ReactORTanstack_Query.API.Models.DTOs.Employee;

namespace ReactORTanstack_Query.API.Models.DTOs.Department
{
    public class DepartmentGetDto
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public List<EmployeeGetDto> Employees { get; set; }
    }
}
