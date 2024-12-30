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
  // Table Data
  const tableData = [
    { department: "Finance", payroll: 35000 },
    { department: "HR", payroll: 15000 },
    { department: "Tech", payroll: 20000 },
    { department: "IT", payroll: 25000 },
    { department: "Sales", payroll: 18000 },
    { department: "Administration", payroll: 45000 },
  ];

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

  const Row = ({ department }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {department.department}
          </TableCell>
          <TableCell align="right">
            ₹ {department.payroll.toLocaleString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="medium"
                aria-label="employees"
                sx={{ margin: "10px 0", padding: "10px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: "8px" }}>Name</TableCell>
                    <TableCell sx={{ padding: "8px" }}>Role</TableCell>
                    <TableCell align="right" sx={{ padding: "8px" }}>
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
      <Typography variant="h4" component="h2" className="mt-4 mb-2">
        Payroll Table
      </Typography>
      <TableContainer
        component={Paper}
        className="py-4 w-[80vw] md:w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Department</TableCell>
              <TableCell align="right">Total SOPs: 3</TableCell>
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
