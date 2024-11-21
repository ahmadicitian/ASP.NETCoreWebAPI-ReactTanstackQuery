import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDepartment, getDepartment } from "../../api/TanstackApi";


function DepartmentDetail() {

    const { departmentId } = useParams();
    const navigate = useNavigate();
    // console.log(departmentId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["Dept", departmentId],
        queryFn: () => getDepartment(departmentId)
    });
    //const department = data.data;

    //* --------------------------------------------------------------
    //? Deleting Department
    //* --------------------------------------------------------------
    const queryClient = useQueryClient();

    const onDeleteDepartment = useMutation({
        mutationFn: (id) => deleteDepartment(id),
        onSuccess: (data, id) => {
            alert('Department deleted successfully!');
            console.log("Delete Dept-Id", id);
            console.log(data);
        },
        onError: (error) => {
            alert('Error deleting department!');
            console.error(error);
        }
    });

    if (isLoading) {
        return <p>Department Data is Loading . . .</p>;
    }
    if (isError) {
        console.error(error);
        return <p>Error Occurred while fetching data!</p>;
    }
    // console.log("Detail....", data.data);



    return (
        <div className="w-[90%] h-[80vh] mx-auto mt-8">
            {/* Department Header */}
            <div className="mb-6 p-4 shadow-lg rounded-md bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-800">
                    Department Detail
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    <strong>Department Name:</strong> {data.data.name}
                </p>
                <p className="text-lg text-gray-600">
                    <strong>Department ID:</strong> {data.data.departmentId}
                </p>
                <Link to={"/dept"}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Back</button>
                </Link>

                <button onClick={() => onDeleteDepartment.mutate(data.data.departmentId)} className=" ml-3 px-4 py-2 bg-red-500 text-white rounded-md text-sm">Delete</button>
                <button onClick={() => navigate(`/dept/${data.data.departmentId}/edit`)} className=" ml-3 px-4 py-2 bg-red-500 text-white rounded-md text-sm">Edit</button>

            </div>

            {/* Employee List Table */}
            <div className="shadow-lg rounded-md bg-white">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Employee ID</th>
                            <th className="py-3 px-4 text-left">Full Name</th>
                            <th className="py-3 px-4 text-left">Position</th>
                            <th className="py-3 px-4 text-left">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.employees.length > 0 ?
                            data.data.employees.map((emp) => (
                                <tr key={emp.employeeId} className="border-b">
                                    <td className="py-3 px-4">{emp.employeeId}</td>
                                    <td className="py-3 px-4">{emp.fullName}</td>
                                    <td className="py-3 px-4">{emp.position}</td>
                                    <td className="py-3 px-4">
                                        ${emp.salary.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                            : <tr>
                                <td className="py-3 px-4">No Employees Available for this Department</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DepartmentDetail;
