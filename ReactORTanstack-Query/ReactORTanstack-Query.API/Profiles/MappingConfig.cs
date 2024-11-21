using AutoMapper;
using ReactORTanstack_Query.API.Models.Domain;
using ReactORTanstack_Query.API.Models.DTOs.Department;
using ReactORTanstack_Query.API.Models.DTOs.Employee;

namespace ReactORTanstack_Query.API.Profiles
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            //CreateMap<Employee, EmployeeGetDto>();
            // CreateMap<Employee, EmployeeGetDto>()
            //.MaxDepth(1); // This prevents recursion beyond 1 level

            // Employee to EmployeeGetDto mapping
            CreateMap<Employee, EmployeeGetDto>()
                .ForMember(dest => dest.DepartmentId, opt => opt.MapFrom(src => src.Department.DepartmentId))
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name)); // Prevent recursion for employee

            CreateMap<Employee, EmployeeCreateDto>().ReverseMap();
            CreateMap<Employee, EmployeeDeleteDto>().ReverseMap();
            CreateMap<Employee, EmployeeUpdateDto>().ReverseMap();

            // CreateMap<Department, DepartmentGetDto>().ReverseMap();
            //CreateMap<Department, DepartmentGetDto>()
            //.ForMember(dest => dest.Employees, opt => opt.MapFrom(src => src.Employees));

            // Department to DepartmentGetDto mapping
            CreateMap<Department, DepartmentGetDto>()
                .ForMember(dest => dest.Employees, opt => opt.MapFrom(src => src.Employees));// Get Employees for Department
                 // Prevent recursion for department

            CreateMap<Department, DepartmentCreateDto>().ReverseMap();
            CreateMap<Department, DepartmentDeleteDto>().ReverseMap();
            CreateMap<Department, DepartmentUpdateDto>().ReverseMap();
        }
    }
}
