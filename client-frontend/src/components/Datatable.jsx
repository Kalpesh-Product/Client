import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "Ticket Title", width: 130 },
  { field: "lastName", headerName: "Priority", width: 130 },
  {
    field: "age",
    headerName: "Department",
    // type: "number",
    width: 160,
  },
  {
    field: "fullName",
    headerName: "Request Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "High", firstName: "No Wifi", age: "Admin" },
  { id: 2, lastName: "Medium", firstName: "No AC", age: "Maintenance" },
  { id: 3, lastName: "Medium", firstName: "No Wifi", age: "IT" },
  { id: 4, lastName: "Low", firstName: "No AC", age: "Admin" },
  { id: 5, lastName: "High", firstName: "No Wifi", age: "Maintenance" },
  { id: 6, lastName: "Low", firstName: "No AC", age: "IT" },
  { id: 7, lastName: "Low", firstName: "No Wifi", age: "Maintenance" },
  { id: 8, lastName: "Medium", firstName: "No AC", age: "Maintenance" },
  { id: 9, lastName: "High", firstName: "No Wifi", age: "Admin" },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
