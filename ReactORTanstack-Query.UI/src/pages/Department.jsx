import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getDepartments } from "../api/TanstackApi.js";
import { Link } from "react-router-dom";
function Department() {
    const [pageNumber, setPageNumber] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0); // Track total records
    const pageSize = 3; // Number of records per page

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["Dept", pageNumber],
        queryFn: async () => {
            const { departments, totalRecords } = await getDepartments(pageNumber);
            setTotalRecords(totalRecords); // Update total records
            return departments;
        },
    });

    const departments = Array.isArray(data) ? data : [];
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (isLoading) {
        return <p>Department Data is Loading . . .</p>;
    }

    if (isError) {
        console.error(error);
        return <p>Error Occurred while fetching data!</p>;
    }

    return (
        <div className="overflow-x-auto m-auto mt-5 w-[80%] h-[82vh]">
            <Link to={"/add-dept"}>
                <button className=" mb-5 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    Add New Department
                </button>
            </Link>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Department Id</th>
                        <th className="py-3 px-4 text-left">Department Name</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr className="border-b" key={dept.departmentId}>
                            <td className="py-3 px-4">{dept.departmentId}</td>
                            <td className="py-3 px-4">{dept.name}</td>
                            <td className="py-3 px-4">
                                <Link to={`/dept/${dept.departmentId}`}>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                                        View Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-section container flex justify-between mt-4">
                <button
                    className="bg-gray-500 text-white border rounded-sm p-2"
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber((prev) => prev - 1)}
                >
                    Prev
                </button>
                <p className="text-black border rounded-sm p-2">
                    Page {pageNumber + 1} of {totalPages}
                </p>
                <button
                    className="bg-gray-500 text-white border rounded-sm p-2"
                    disabled={pageNumber + 1 >= totalPages}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
export default Department;