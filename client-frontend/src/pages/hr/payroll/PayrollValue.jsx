import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const PayrollValue = () => {
  // Dummy Employee Data per Department
  const employeeData = {
    Finance: [
      { name: "John Doe", role: "Accountant", salary: 5000 },
      { name: "Jane Smith", role: "Auditor", salary: 6000 },
    ],
    HR: [
      { name: "Alice Brown", role: "Recruiter", salary: 4000 },
      { name: "Bob White", role: "HR Manager", salary: 7000 },
    ],
    Tech: [
      { name: "Charlie Green", role: "Developer", salary: 8000 },
      { name: "Daisy Blue", role: "Tester", salary: 5000 },
    ],
    IT: [
      { name: "Eve Black", role: "SysAdmin", salary: 5500 },
      { name: "Frank Red", role: "Network Admin", salary: 6000 },
    ],
    Sales: [
      { name: "Grace Pink", role: "Sales Exec", salary: 4500 },
      { name: "Hank Yellow", role: "Sales Manager", salary: 6500 },
    ],
    Administration: [
      { name: "Ivy Purple", role: "Admin Assistant", salary: 4000 },
      { name: "Jack Orange", role: "Office Manager", salary: 6000 },
    ],
  };

  // Calculate payroll dynamically based on employee salaries
  const tableData = Object.entries(employeeData).map(
    ([department, employees]) => ({
      department,
      payroll: employees.reduce(
        (total, employee) => total + employee.salary,
        0
      ),
    })
  );

  const Row = ({ department }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
          <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {department.department}
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent table row click event
                  setOpen(!open);
                }}
                sx={{ marginLeft: 1 }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="right" sx={{ fontWeight: "bold" }}>
            ₹ {department.payroll.toLocaleString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="medium"
                aria-label="employees"
                sx={{ margin: "10px 0", padding: "10px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: "8px",fontWeight:"bold" }}>Name</TableCell>
                    <TableCell sx={{ padding: "8px",fontWeight:"bold" }}>Role</TableCell>
                    <TableCell align="right" sx={{ padding: "8px",fontWeight:"bold" }}>
                      Salary (₹)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(employeeData[department.department] || []).map(
                    (employee) => (
                      <TableRow key={employee.name}>
                        <TableCell sx={{ padding: "8px" }}>
                          {employee.name}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {employee.role}
                        </TableCell>
                        <TableCell align="right" sx={{ padding: "8px" }}>
                          ₹ {employee.salary.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Payroll Value</h1>
      <TableContainer
        sx={{ boxShadow: "none" }}
        component={Paper}
        className="p-4 bg-white w-[80vw] md:w-full"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Department
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
              >
                Total Payroll (₹)
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((department) => (
              <Row key={department.department} department={department} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default PayrollValue;
