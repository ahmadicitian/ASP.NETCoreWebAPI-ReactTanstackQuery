import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../../api/TanstackApi';

function EmployeeCard({ empData }) {
    const navigate = useNavigate();

    // Deleting employee
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteEmployee(id),
        onSuccess: (data) => {
            alert('Employee deleted successfully!');
            console.log('Deleted Employee Data:', data);
        },
        onError: (error) => {
            alert('Error deleting employee!');
            console.error(error);
        },
    });

    const deleteEmployeeHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="max-w-[300px] w-full bg-gray-400 shadow-lg rounded-lg overflow-hidden">
            <img
                src={empData.imagePath}
                alt={empData.fullName}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{empData.fullName}</h2>
                <p className="text-gray-600">Position - {empData.position}</p>
                <p className="text-gray-600">Salary - {empData.salary}</p>
                <span className="text-sm text-gray-500">
                    Department - {empData.departmentName}
                </span>
            </div>
            <div className="p-4 flex justify-between items-center">
                <button
                    onClick={() => navigate(`/emp/${empData.employeeId}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                >
                    View Details
                </button>
                <button
                    onClick={() => deleteEmployeeHandler(empData.employeeId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
                    disabled={deleteMutation.isLoading}
                >
                    {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}

export default EmployeeCard;
