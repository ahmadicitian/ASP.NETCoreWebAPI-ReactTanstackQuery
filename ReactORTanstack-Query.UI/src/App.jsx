import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Department from "./pages/Department";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
import MainLayout from "./components/Layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment } from "react";
import DepartmentDetail from "./components/UI/DepartmentDetail";
import AddDepartment from "./components/UI/AddDepartment";
import EditDepartment from "./components/UI/EditDepartment";
import EmployeeDetail from "./components/UI/EmployeeDetail";
import AddEmployee from "./components/UI/AddEmployee"; // Import AddEmployee

const routes = createBrowserRouter([
  {
    path: "/", element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dept", element: <Department /> },
      { path: "/dept/:departmentId", element: <DepartmentDetail /> },
      { path: "/dept/:departmentId/edit", element: <EditDepartment /> },
      { path: "/add-dept", element: <AddDepartment /> },
      { path: "/emp", element: <Employee /> },
      { path: "/emp/:employeeId", element: <EmployeeDetail /> }, // Employee Detail
      { path: "/add-emp", element: <AddEmployee /> }, // Add Employee (no ID)
      { path: "/add-emp/:employeeId", element: <AddEmployee /> }, // Edit Employee (with ID)
    ]
  }
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
