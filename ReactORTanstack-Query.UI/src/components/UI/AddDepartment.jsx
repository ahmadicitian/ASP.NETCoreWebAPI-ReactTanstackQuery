import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { addDepartment } from '../../api/TanstackApi';

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");

    const mutation = useMutation({
        mutationFn: addDepartment,  // Use the correct function reference
        onSuccess: () => {
            alert('Department added successfully!');
        },
        onError: (error) => {
            alert('Error adding department!');
            console.error(error);
        }
    });


    function handleDepartmentNameChange(event) {
        setDepartmentName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Department Name:", departmentName);

        // Instead of FormData, pass a plain object
        const deptData = {
            Name: departmentName,  // Key should match the server's expected format
        };

        mutation.mutate(deptData); // Directly pass the object here
        setDepartmentName(""); // Clear input field after submission
    }

    return (
        <div className="max-w-md mx-auto bg-white p-5 shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-5">Add Department</h2>
            <form onSubmit={handleSubmit}>
                {/* Department Name */}
                <div className="mb-4">
                    <label htmlFor="departmentName" className="block text-gray-700">Department Name</label>
                    <input
                        type="text"
                        id="departmentName"
                        name="departmentName"
                        placeholder='name'
                        value={departmentName}
                        onChange={handleDepartmentNameChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddDepartment