import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEmployee } from '../../api/TanstackApi';

const EmployeeDetail = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate(); // Use navigate to programmatically redirect

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Emp', employeeId],
        queryFn: () => getEmployee(employeeId),
    });

    if (isLoading) {
        return <p>Loading Employee Details...</p>;
    }

    if (isError) {
        console.error(error);
        return <p>Error fetching employee details!</p>;
    }

    const { fullName, position, salary, imagePath, departmentName } = data?.data;

    const handleEditClick = () => {
        // Redirect to the AddEmployee component with the employeeId as a query parameter
        navigate(`/add-emp/${employeeId}`);
    };

    return (
        <div className="container mx-auto mt-8 p-4 shadow-lg rounded-md bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">Employee Details</h1>
            <div className="flex flex-col md:flex-row mt-6">
                <div className="flex-shrink-0">
                    <img
                        src={imagePath}
                        alt={fullName}
                        className="w-48 h-48 object-cover rounded-md"
                    />
                </div>
                <div className="md:ml-6 mt-4 md:mt-0">
                    <p className="text-lg">
                        <strong>Full Name:</strong> {fullName}
                    </p>
                    <p className="text-lg">
                        <strong>Position:</strong> {position}
                    </p>
                    <p className="text-lg">
                        <strong>Salary:</strong> ${salary.toLocaleString()}
                    </p>
                    <p className="text-lg">
                        <strong>Department:</strong> {departmentName}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Link to="/emp">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Back to Employees
                    </button>
                </Link>
                <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Edit Employee
                </button>
            </div>
        </div>
    );
};

export default EmployeeDetail;
