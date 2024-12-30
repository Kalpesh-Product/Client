export const EmployeeCount = ({ count }) => (
    <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Total Employees</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );


  export const LeaveRequests = ({ count }) => (
    <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Pending Leave Requests</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );

  
  export const PayrollSummary = ({ amount }) => (
    <div className="p-4 bg-green-600 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Payroll Summary</h3>
      <p className="text-2xl font-bold">{amount}</p>
    </div>
  );

  
  export const AttendanceRate = ({ rate }) => (
    <div className="p-4 bg-indigo-600 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Attendance Rate</h3>
      <p className="text-2xl font-bold">{rate}</p>
    </div>
  );

  
  export const NewHires = ({ count }) => (
    <div className="p-4 bg-purple-600 text-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">New Hires This Month</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
  
  
