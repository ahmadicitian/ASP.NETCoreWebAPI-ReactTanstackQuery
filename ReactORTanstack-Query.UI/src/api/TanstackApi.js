import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7258/api"
});
//https://localhost:7258/api/Department/GetDepartments?pageIndex=2&pageSize=1
//! ------ GET ALL DEPARTMENTS ------
// export const getDepartments = async (pageNumber) => {
//     try {
//         const response = await api.get(`/Department/GetDepartments?pageIndex=${pageNumber + 1}&pageSize=3`);

//         // const response = await api.get(`/Department/GetDepartments?pageIndex=${pageNumber}&pageSize=3`);
//         // console.log("Api Response :", response.data)
//         return response.data; // Return the actual data from the response
//     } catch (error) {
//         console.error("Error fetching departments:", error);
//         throw new Error("Failed to fetch departments");
//     }
// };
export const getDepartments = async (pageNumber) => {
    try {
        const response = await api.get(`/Department/GetDepartments?pageIndex=${pageNumber + 1}&pageSize=3`);
        return {
            departments: response.data.dataList, // List of departments
            totalRecords: response.data.totalRecords // Total number of records
        };
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw new Error("Failed to fetch departments");
    }
};


//! ------ GET SINGLE DEPARTMENT ------
export const getDepartment = async (id) => {
    try {
        const response = await api.get("/Department/GetDepartment/" + id);
        return response.data;
    } catch (error) {
        console.error("Error fetching department:", error);
        throw new Error("Failed to fetch departments");
    }
}

//! ------ ADD DEPARTMENT ------
export const addDepartment = async (deptData) => {
    try {
        const response = await api.post("/Department/AddDepartment", deptData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;  // Return the response from the server (you can adjust as needed)
    } catch (error) {
        console.error("Error adding department:", error);
        throw new Error("Failed to add department");
    }
}

//! ------ DELETE DEPARTMENT ------
export const deleteDepartment = async (id) => {
    try {
        const response = await api.delete("/Department/DeleteDepartment/" + id);
        return response.data;
    } catch (error) {
        console.error("Error deleting department:", error);
        throw new Error("Failed to delete department");
    }
}

//! ------ UPDATE DEPARTMENT ------
export const updateDepartment = async (id, updatedData) => {
    try {
        const response = await api.put(`/Department/UpdateDepartment/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating department:", error);
        throw new Error("Failed to update department");
    }
};


//* ----------------- EMPLOYEE -----------------

//! ------ GET ALL EMPLOYEES ------
export const getEmployees = async () => {
    try {
        const response = await api.get("/Employee/GetEmployees");
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees");
    }
}

//! ------ GET SINGLE EMPLOYEE ------
export const getEmployee = async (id) => {
    try {
        const response = await api.get(`/Employee/GetEmployee/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error("Failed to fetch employee");
    }
};

//! ------ CREATE EMPLOYEE ------
export const createEmployee = async (employeeData) => {
    try {
        const response = await api.post("/Employee/AddEmployee", employeeData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee");
    }
};

//! ------ DELETE EMPLOYEE ------
export const deleteEmployee = async (employeeId) => {
    try {
        const response = await api.delete("/Employee/DeleteEmployee/" + employeeId);
        return response.data;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error("Failed to delete employee");
    }
}

//! ------ UPDATE EMPLOYEE ------
export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await api.put(`/Employee/UpdateEmployee/${id}`, employeeData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return the updated employee data or success message
    } catch (error) {
        console.error("Error updating employee:", error);
        throw new Error("Failed to update employee");
    }
};
