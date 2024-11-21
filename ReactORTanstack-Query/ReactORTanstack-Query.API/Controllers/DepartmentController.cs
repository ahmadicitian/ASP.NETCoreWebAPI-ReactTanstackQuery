using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactORTanstack_Query.API.Models.Domain;
using ReactORTanstack_Query.API.Models.DTOs.Department;
using ReactORTanstack_Query.API.Repository.IRepository;
using ReactORTanstack_Query.API.Utility;
using System.Linq.Expressions;

namespace ReactORTanstack_Query.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;
        private readonly IDepartmentRepository _departmentRepo;
        private readonly IMapper _mapper;
        public DepartmentController(IEmployeeRepository employeeRepository,
            IDepartmentRepository departmentRepo, IMapper mapper)
        {
            this._employeeRepo = employeeRepository;
            this._departmentRepo = departmentRepo;
            this._mapper = mapper;
        }

        /*---------- Adding Department ----------*/
        [HttpPost]
        [Route("AddDepartment")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> DepartmentPOST(DepartmentCreateDto departmentCreateDto)
        {
            //Convert DTO to Domain Model
            var departmentDomain = _mapper.Map<Department>(departmentCreateDto);
            var response = await _departmentRepo.CreateAsync(departmentDomain);
            return Ok(new { message = "Department Added!", data = response });
        }
        [HttpGet]
        [Route("GetDepartments")]
        public async Task<IActionResult> DepartmentsGET(
    [FromQuery] string? filter = null,
    [FromQuery] int pageIndex = 1, // Default pageIndex set to 1
    [FromQuery] int pageSize = 5) // Set pageSize to 5
        {
            Expression<Func<Department, bool>>? filterExpression = null;
            if (!string.IsNullOrEmpty(filter))
            {
                filterExpression = d => d.Name.Contains(filter);
            }

            var response = await _departmentRepo.GetAllAsync(
                includeProperties: "Employees",
                filter: filterExpression,
                pageIndex: pageIndex,
                pageSize: pageSize);

            if (response == null || !response.Any())
            {
                return NotFound(new { message = "No Department Record Found" });
            }

            var departmentDTO = _mapper.Map<List<DepartmentGetDto>>(response);

            return Ok(new
            {
                message = "Departments List",
                dataList = departmentDTO,
                totalRecords = await _departmentRepo.GetTotalCountAsync(filterExpression) // Total records for frontend
            });
        }


        [HttpGet]
        [Route("GetDepartment/{id}")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> DepartmentGET(int id)
        {
            var response = await _departmentRepo.GetAsync(x => x.DepartmentId == id,"Employees");
            if (response is not null)
            {
                var deparmentDTO = _mapper.Map<DepartmentGetDto>(response);
                return Ok(new { message = "Department Record", data = deparmentDTO });
            }
            return BadRequest(new { message = "No such department record found" });
        }
        [HttpDelete]
        [Route("DeleteDepartment/{id}")]
        //public async Task<IActionResult> DepartmentDELETE(int id)
        //{
        //    var departmentDomain = await _departmentRepo.GetAsync(x => x.DepartmentId == id);
        //    if (departmentDomain is not null)
        //    {
        //        var response = await _departmentRepo.DeleteAsync(departmentDomain);
        //        var deparmentDTO = _mapper.Map<DepartmentDeleteDto>(response);
        //        return Ok(new { message = "Department Deleted!", data = deparmentDTO });
        //    }
        //    return NotFound(new { message = "Department Record Not Found" });
        //}
        public async Task<IActionResult> DepartmentDELETE(int id)
        {
            var departmentDomain = await _departmentRepo.GetAsync(x => x.DepartmentId == id);
            if (departmentDomain is not null)
            {
                // Step 1: Set related employees' DepartmentId to NULL
                var employees = await _employeeRepo.GetAllAsync(filter: e => e.DepartmentId == id);
                foreach (var employee in employees)
                {
                    employee.DepartmentId = null;
                }
                await _employeeRepo.UpdateAsyncRange(employees);

                // Step 2: Delete the department
                var response = await _departmentRepo.DeleteAsync(departmentDomain);
                var departmentDTO = _mapper.Map<DepartmentDeleteDto>(response);

                return Ok(new { message = "Department Deleted!", data = departmentDTO });
            }

            return NotFound(new { message = "Department Record Not Found" });
        }

        [HttpPut]
        [Route("UpdateDepartment/{id}")]
        [ServiceFilter(typeof(ValidateModelStateFilter))]
        public async Task<IActionResult> DepartmentPUT(int id, DepartmentUpdateDto departmentUpdateDto)
        {
            if (id != departmentUpdateDto.DepartmentId)
            {
                return BadRequest(new { message = "No Such Department is Found" });
            }
            //convert DTO to Domain Model
            var departmentDomain = _mapper.Map<Department>(departmentUpdateDto);
            var response = await _departmentRepo.UpdateAsync(departmentDomain);
            return Ok(new { message = "Department Record Updated!", data = response });
        }
    }
}
