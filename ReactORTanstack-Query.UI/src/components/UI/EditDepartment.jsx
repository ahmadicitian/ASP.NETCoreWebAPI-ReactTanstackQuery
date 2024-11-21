import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDepartment, updateDepartment } from "../../api/TanstackApi";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartment() {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["Dept", departmentId],
        queryFn: () => getDepartment(departmentId),
    });

    const [formData, setFormData] = useState({
        name: "",
    });

    // Set initial data when fetched
    React.useEffect(() => {
        if (data) {
            setFormData({
                departmentId: data.data.departmentId,
                name: data.data.name,
            });
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (updatedDept) => updateDepartment(departmentId, updatedDept),
        onSuccess: () => {
            queryClient.invalidateQueries(["Dept"]);
            navigate("/dept");
        },
        onError: (err) => {
            console.error("Update Failed:", err);
            alert("Failed to update department.");
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return <p>Loading department data...</p>;
    if (isError) {
        console.error(error);
        return <p>Error loading department data!</p>;
    }

    return (
        <div className="w-[90%] mx-auto mt-8">
            <h1 className="text-3xl font-bold">Edit Department</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Department Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditDepartment;
