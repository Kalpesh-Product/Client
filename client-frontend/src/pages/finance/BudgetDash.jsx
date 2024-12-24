import {
  Table,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
  Paper,
  TableContainer,
  Tabs,
} from "@mui/material";

import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BudgetDash() {
    const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [quarter, setQuarter] = useState("Q1");
    const [view, setView] = useState("Monthly");
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleQuarterChange = (event, newValue) => {
    setQuarter(newValue);
  };
  return (
    <div className="p-6">
      <h1 className="wono-title">Budget</h1>
      <div className="grid grid-cols-2 gap-2 my-2">
        {/* Widget:1 */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Allocated Budget</p>
          <h2 className="text-2xl font-semibold text-gray-800">&#x20b9; 200</h2>
        </div>
        {/* Widget:2 */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Used budget</p>
          <h2 className="text-2xl font-semibold text-gray-800">&#x20b9; 200</h2>
        </div>
      </div>
      <div className="bg-white p-2">
        {/* Dropdown */}
        <div className="flex gap-4">
          <FormControl variant="outlined" className="mb-4">
            <InputLabel id="view-select-label">View</InputLabel>
            <Select
              labelId="view-select-label"
              value={view}
              onChange={handleViewChange}
              label="View"
              className="mb-4"
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Annually">Annually</MenuItem>
            </Select>
          </FormControl>
          {view === "Monthly" && (
            <FormControl variant="outlined" className="mb-4">
              <InputLabel id="view-select-label">Select Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Select Month"
                sx={{ width: 150 }}
                className="mb-4"
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>

        {/* Table Placeholder */}
        <TableContainer component={Paper}>
          <Table>
            {/* Monthly View */}
            {view === "Monthly" && (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold bg-gray-100 text-blue-600">
                      Category
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-100 text-blue-600">
                      Monthly Allocated
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-100 text-blue-600">
                      Spent
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-100 text-blue-600">
                      Remaining
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>Monthly Category {index + 1}</TableCell>
                      <TableCell>$100.00</TableCell>
                      <TableCell>$50.00</TableCell>
                      <TableCell>$50.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}

            {/* Annual View */}
            {view === "Annually" && (
              <>
                {/* Tabs for Quarters */}
                <Tabs
                  value={quarter}
                  onChange={handleQuarterChange}
                  indicatorColor="primary"
                  textColor="primary"
                  className="mb-4"
                  variant="fullWidth"
                >
                  <Tab label="Q1" value="Q1" />
                  <Tab label="Q2" value="Q2" />
                  <Tab label="Q3" value="Q3" />
                  <Tab label="Q4" value="Q4" />
                </Tabs>

                {/* Table for Annual Data */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold bg-gray-100 text-blue-600">
                        Category
                      </TableCell>
                      <TableCell className="font-bold bg-gray-100 text-blue-600">
                        {quarter} Allocated
                      </TableCell>
                      <TableCell className="font-bold bg-gray-100 text-blue-600">
                        {quarter} Spent
                      </TableCell>
                      <TableCell className="font-bold bg-gray-100 text-blue-600">
                        {quarter} Remaining
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {[...Array(3)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {quarter} - Annual Category {index + 1}
                        </TableCell>
                        <TableCell>$1200.00</TableCell>
                        <TableCell>$600.00</TableCell>
                        <TableCell>$600.00</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
