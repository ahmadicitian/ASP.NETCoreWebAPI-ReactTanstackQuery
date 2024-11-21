import React, { Fragment } from 'react'
import EmployeeCard from '../components/UI/EmployeeCard'
import { useQuery } from '@tanstack/react-query'
import { getEmployees } from '../api/TanstackApi';
import { Link } from 'react-router-dom';

const Employee = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["Emp"],
        queryFn: getEmployees
    });

    // Accessing employee data safely
    const employees = data?.data || [];
    //  console.log("First Employee:", employees[0]);
    // console.log("Second Employee:", data?.data[1]);
    if (employees.length === 0) {
        return <>
            <Link to={"/add-emp"}>
                <button className=" mb-5 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    Add New Employee
                </button>
            </Link>
            <p>No Employee Availablae!</p>
        </>

    }
    if (isLoading) {
        return <p>Employee record is Loading . . . </p>
    }
    if (isError) {
        console.log(error);
        return <p>Error Occurred while fetching employees record.</p>
    }


    return (
        <Fragment>
            <Link to={"/add-emp"}>
                <button className="mt-5 ml-5 mb-5 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    Add New Employee
                </button>
            </Link>
            <div className='container md:grid-cols-3 sm:grid-cols-2 grid grid-cols-4 gap-3 place-items-center px-5 py-5'>

                {employees.map((emp) => {
                    return <EmployeeCard key={emp.employeeId} empData={emp} />
                })}
            </div>
        </Fragment>
    )
}

export default Employee