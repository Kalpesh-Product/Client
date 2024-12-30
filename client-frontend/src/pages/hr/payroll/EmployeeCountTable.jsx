import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/axios";
import AgTable from "../../../components/AgTable";

export default function EmployeeCountTable() {
  // Fetch data using react-query
  const { isLoading, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/users/fetch-users");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Error fetching users"
        );
      }
    },
  });

  // Define important fields
  const getTableData = (users) => {
    return users.map((user) => ({
      empId: user.empId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role?.roleTitle,
      department: user.department?.map((dept) => dept.name).join(", "),
      services: user.selectedServices?.join(", "),
    }));
  };

  // Column definitions for AgTable
  const columns = [
    { headerName: "Employee ID", field: "empId", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    {
      headerName: "Department",
      field: "department",
      sortable: true,
      filter: true,
    },
    { headerName: "Services", field: "services", sortable: true, filter: true },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableData = getTableData(data.users);

  return (
    <div className="p-4 bg-white w-[80vw] md:w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Details</h2>
      <AgTable
        data={tableData}
        columns={columns}
        paginationPageSize={5}
        highlightFirstRow={false}
        highlightEditedRow={false}
      />
    </div>
  );
}
