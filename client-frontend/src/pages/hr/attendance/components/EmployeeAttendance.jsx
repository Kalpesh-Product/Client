import React from "react";

const EmployeeAttendance = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg py-4 w-full">
      <h2 className="text-xl font-semibold">Employee Attendance</h2>

      {/* Section 1: Summary and Search Filter */}
      <div className="flex justify-between items-center">
        {/* Section 1-1: Summary */}
        <div className="space-y-2">
          <p>
            <span className="font-medium">On Time:</span> {data.summary.onTime}
          </p>
          <p>
            <span className="font-medium">Late:</span> {data.summary.late}
          </p>
          <p>
            <span className="font-medium">Absent:</span> {data.summary.absent}
          </p>
        </div>

        {/* Section 1-2: Search Filter */}
        <div>
          <input
            type="text"
            placeholder="Search employee..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Section 2: Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Employee Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Check-In</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.map((employee, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-200 px-4 py-2">
                  {employee.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {employee.status}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {employee.checkIn}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {employee.checkOut}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
