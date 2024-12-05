import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

const Budget = () => {
  const location = useLocation();
  const [user, setUSer] = useState("");
  const [view, setView] = useState("Monthly");
  const [quarter, setQuarter] = useState("Q1");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUSer(storedUser);
  }, []);

  //   Budget category dropdown
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  // Quarter Change
  const handleQuarterChange = (event, newValue) => {
    setQuarter(newValue);
  };

  return (
    <>
      {location.pathname === "/frontend/budget" ? (
        <>
          <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
              {/* Page Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.department} Budget Overview
                </h1>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                  Add Budget
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Total Budget</p>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    $0.00
                  </h2>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Expenses</p>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    $0.00
                  </h2>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Remaining</p>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    $0.00
                  </h2>
                </div>
              </div>

              {/* Budget Table */}
              <div className="bg-gray-50 border rounded-lg shadow-sm">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-gray-600 font-semibold">
                        Category
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-semibold">
                        Allocated
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-semibold">
                        Spent
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-semibold">
                        Remaining
                      </th>
                      <th className="px-4 py-2 text-gray-600 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-3 text-gray-500">
                          Category {index + 1}
                        </td>
                        <td className="px-4 py-3 text-gray-700">$0.00</td>
                        <td className="px-4 py-3 text-gray-700">$0.00</td>
                        <td className="px-4 py-3 text-gray-700">$0.00</td>
                        <td className="px-4 py-3">
                          <button className="text-blue-500 hover:underline">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Placeholder Chart */}
              <div className="mt-8 bg-gray-50 p-6 border rounded-lg shadow-sm flex justify-center items-center">
                <p className="text-gray-400">Chart Placeholder</p>
              </div>
            </div>
          </div>
        </>
      ) : location.pathname === "/frontend/budget/overview" ? (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-2 my-2">
            {/* Widget:1 */}
            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Allocated Budget</p>
              <h2 className="text-2xl font-semibold text-gray-800">
                &#x20b9; 200
              </h2>
            </div>
            {/* Widget:2 */}
            <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Used budget</p>
              <h2 className="text-2xl font-semibold text-gray-800">
                &#x20b9; 200
              </h2>
            </div>
          </div>
          <div className="bg-white p-2">
            {/* Dropdown */}
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

            {/* Table Placeholder */}
            <TableContainer component={Paper}>
              <Table>
                {/* Monthly View */}
                {view === "Monthly" && (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-semibold bg-gray-100 text-blue-600">Category</TableCell>
                        <TableCell className="font-semibold bg-gray-100 text-blue-600">Monthly Allocated</TableCell>
                        <TableCell className="font-semibold bg-gray-100 text-blue-600">Spent</TableCell>
                        <TableCell className="font-semibold bg-gray-100 text-blue-600">Remaining</TableCell>
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
      ) : (
        <>
          <h1></h1>
        </>
      )}
    </>
  );
};

export default Budget;
