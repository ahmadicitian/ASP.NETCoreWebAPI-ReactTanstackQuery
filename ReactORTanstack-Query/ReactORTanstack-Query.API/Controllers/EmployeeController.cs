using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactORTanstack_Query.API.Models.Domain;
using ReactORTanstack_Query.API.Models.DTOs.Department;
using ReactORTanstack_Query.API.Models.DTOs.Employee;
using ReactORTanstack_Query.API.Repository.IRepository;
using ReactORTanstack_Query.API.Upload;
using ReactORTanstack_Query.API.Utility;
using System.Linq.Expressions;

namespace ReactORTanstack_Query.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;
        private readonly IDepartmentRepository _departmentRepo;
        private readonly IMapper _mapper;
        private readonly UploadFiles _uploadFiles;
        public EmployeeController(IEmployeeRepository employeeRepository,
            IDepartmentRepository departmentRepo, IMapper mapper,
            UploadFiles uploadFiles)
        {
            this._employeeRepo = employeeRepository;
            this._departmentRepo = departmentRepo;
            this._mapper = mapper;
            this._uploadFiles = uploadFiles;
        }
        [HttpPost("AddEmployee")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> EmployeePOST(EmployeeCreateDto employeeCreateDto)
        {
            var employeeDomain = _mapper.Map<Employee>(employeeCreateDto);
            employeeDomain.ImagePath = _uploadFiles.SaveImage(employeeDomain.ImageFile);
            var response = await _employeeRepo.CreateAsync(employeeDomain);
            var employeeDTO = _mapper.Map<EmployeeGetDto>(response);
            return Ok(new { message = "Employee Added!", data = employeeDTO });
        }
        [HttpGet("GetEmployees")]
        //https://localhost:7258/api/Employee/GetEmployees?filter=S&pageIndex=1&pageSize=10
        public async Task<IActionResult> EmployeesGET(
        [FromQuery] string? filter = null,
        [FromQuery] int pageIndex = 1,
        [FromQuery] int pageSize = 10)
        {
            // Create filter expression for filtering employees by name or any property
            Expression<Func<Employee, bool>>? filterExpression = null;
            if (!string.IsNullOrEmpty(filter))
            {
                filterExpression = e => e.FullName.Contains(filter); // Adjust this to filter by relevant property
            }

            // Fetch employees with pagination and filtering
            var employeeDomain = await _employeeRepo.GetAllAsync(
                includeProperties: "Department",
                filter: filterExpression,
                pageIndex: pageIndex,
                pageSize: pageSize);

            if (employeeDomain == null || !employeeDomain.Any())
            {
                return NotFound(new { message = "No Employee Records Found" });
            }

            // Map to DTO model
            var employeeDTO = _mapper.Map<List<EmployeeGetDto>>(employeeDomain);
            return Ok(new { message = "Employees Record!", data = employeeDTO });
        }

        [HttpGet]
        [Route("GetEmployee/{id}")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> EmployeeGET(int id)
        {
            var response = await _employeeRepo.GetAsync(x => x.EmployeeId == id,"Department");
            if (response is not null)
            {
                var employeeDTO = _mapper.Map<EmployeeGetDto>(response);
                return Ok(new { message = "Employee Record", data = employeeDTO });
            }
            return BadRequest(new { message = "No such employee record found" });
        }
        [HttpDelete]
        [Route("DeleteEmployee/{id}")]
        public async Task<IActionResult> EmployeeDELETE(int id)
        {
            var employeeDomain = await _employeeRepo.GetAsync(x => x.EmployeeId == id);
            if (employeeDomain is not null)
            {
                // Deleting the image file if it exists
                if (!string.IsNullOrEmpty(employeeDomain.ImagePath))
                {
                    string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", Path.GetFileName(employeeDomain.ImagePath));
                    if (System.IO.File.Exists(imagePath))
                    {
                        System.IO.File.Delete(imagePath); // Delete the image file
                    }
                }

                // Deleting the employee record from the repository
                var response = await _employeeRepo.DeleteAsync(employeeDomain);
                var employeeDTO = _mapper.Map<EmployeeDeleteDto>(response);
                return Ok(new { message = "Employee Deleted!", data = employeeDTO });
            }
            return NotFound(new { message = "Employee Record Not Found" });
        }
        [HttpPut]
        [Route("UpdateEmployee/{id}")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> EmployeePUT(int id, EmployeeUpdateDto employeeUpdateDto)
        {
            if (id != employeeUpdateDto.EmployeeId)
            {
                return BadRequest(new { message = "No Such employee is Found" });
            }

            // Fetch the employee entity from the database
            var employeeDom = await _employeeRepo.GetAsync(x => x.EmployeeId == employeeUpdateDto.EmployeeId);
            if (employeeDom == null)
            {
                return NotFound(new { message = "Employee Not Found" });
            }

            // Deleting the old image if it exists
            if (!string.IsNullOrEmpty(employeeDom.ImagePath))
            {
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", Path.GetFileName(employeeDom.ImagePath));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath); // Delete the image file
                }
            }

            // Map the DTO to the domain model
            _mapper.Map(employeeUpdateDto, employeeDom); // This updates employeeDom with the new values from employeeUpdateDto

            // If a new image is provided, save it
            if (employeeUpdateDto.ImageFile != null)
            {
                employeeDom.ImagePath = _uploadFiles.SaveImage(employeeUpdateDto.ImageFile);
            }

            // Update the entity in the database
            var response = await _employeeRepo.UpdateAsync(employeeDom);
            var employeeDTO = _mapper.Map<EmployeeGetDto>(response);

            return Ok(new { message = "Employee Record Updated!", data = response });
        }

    }
}
