import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/axios";
import AgTable from "../../../components/AgTable";

export default function DuePayout() {
  // Fetch employee data using react-query
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

  // Define important fields with dummy due payouts
  const getTableDataWithPayout = (users) => {
    return users.map((user, index) => ({
      empId: user.empId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role?.roleTitle,
      department: user.department?.map((dept) => dept.name).join(", "),
      duePayout: (Math.random() * 100000).toFixed(2), // Dummy due payout
    }));
  };

  // Cell renderer for "Due Payout" column
  const DuePayoutRenderer = (params) => {
    const value = Number(params.value).toLocaleString();
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium text-red-600 bg-red-100`}
      >
        ₹{value}
      </span>
    );
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
    {
      headerName: "Due Payout",
      field: "duePayout",
      sortable: true,
      filter: true,
      cellRenderer: DuePayoutRenderer, // Use the custom renderer
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableData = getTableDataWithPayout(data.users);

  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Due Payouts</h2>
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
