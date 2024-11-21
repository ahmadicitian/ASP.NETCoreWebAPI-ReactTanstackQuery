import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDepartments, createEmployee, getEmployee, updateEmployee } from '../../api/TanstackApi';
import { useParams } from 'react-router-dom';

const AddEmployee = () => {
    const { employeeId } = useParams(); // Get the ID for editing mode
    console.log("Employee ID From the URL:", employeeId);

    const [formMode, setFormMode] = useState("add"); // Default mode is 'add'
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        salary: '',
        imageFile: null,
        departmentId: '',
    });

    // Fetch departments for dropdown
    const { data: departments, isLoading: isDeptLoading, isError: isDeptError } = useQuery({
        queryKey: ['Dept'],
        queryFn: getDepartments,
    });

    // Fetch employee data if in edit mode
    const { data: employeeData, isLoading, isError } = useQuery({
        queryKey: ['Emp', employeeId],
        queryFn: () => getEmployee(employeeId),
        enabled: !!employeeId, // Fetch only if employeeId is available
    });

    useEffect(() => {
        if (employeeData?.data) {
            // When employeeData is fetched successfully, update formData
            console.log("Employee Data:", employeeData?.data); // Log to verify data structure
            setFormData({
                fullName: employeeData?.data.fullName,
                position: employeeData?.data.position,
                salary: employeeData?.data.salary,
                departmentId: employeeData?.data.departmentId,
                imageFile: null, // New image can be uploaded
            });
            setFormMode("edit"); // Change mode to edit
        }
    }, [employeeData]); // Trigger effect when employeeData changes

    // Mutation for add or update
    const mutation = useMutation({
        mutationFn: (data) =>
            formMode === "add" ? createEmployee(data) : updateEmployee(employeeId, data),
        onSuccess: () => {
            alert(
                formMode === "add"
                    ? "Employee added successfully!"
                    : "Employee updated successfully!"
            );
        },
        onError: (error) => alert("Error: " + error.message),
    });

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                form.append(key, value);
            }
        });
        form.append("EmployeeId", employeeId);

        mutation.mutate(form);
    };

    // Form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    };

    if (isDeptLoading) return <p>Loading departments...</p>;
    if (isDeptError) return <p>Error loading departments!</p>;
    if (isLoading) {
        console.log("Loading employee data...");
    }

    if (isError) {
        console.log("Error fetching employee data");
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">
                {formMode === "add" ? "Add Employee" : "Edit Employee"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Position</label>
                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 border rounded-md"
                    >
                        <option value="">Select Position</option>
                        <option value="Manager">Manager</option>
                        <option value="CEO">CEO</option>
                        <option value="Worker">Worker</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Department</label>
                    <select
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-2 border rounded-md"
                    >
                        <option value="">Select Department</option>
                        {departments?.dataList.map((dept) => (
                            <option key={dept.departmentId} value={dept.departmentId}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading
                        ? formMode === "add"
                            ? "Creating..."
                            : "Updating..."
                        : formMode === "add"
                            ? "Add Employee"
                            : "Update Employee"}
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
