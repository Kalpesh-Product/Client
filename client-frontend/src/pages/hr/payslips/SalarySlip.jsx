import React from "react";

const SalarySlip = () => {
  const employeeDetails = {
    name: "John Doe",
    employeeId: "EMP12345",
    designation: "Software Engineer",
    department: "Technology",
    month: "December 2024",
    basicPay: 50000,
    hra: 15000,
    allowances: 10000,
    deductions: 5000,
    netPay: 70000,
  };

  return (
    <div
      id=""
      className="max-w-2xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg p-8 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Pay Slip</h1>

      <div className="border-t border-gray-300 mb-4"></div>

      {/* Employee Details */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="font-semibold">Employee Name:</p>
          <p>{employeeDetails.name}</p>
        </div>
        <div>
          <p className="font-semibold">Employee ID:</p>
          <p>{employeeDetails.employeeId}</p>
        </div>
        <div>
          <p className="font-semibold">Designation:</p>
          <p>{employeeDetails.designation}</p>
        </div>
        <div>
          <p className="font-semibold">Department:</p>
          <p>{employeeDetails.department}</p>
        </div>
        <div>
          <p className="font-semibold">Month:</p>
          <p>{employeeDetails.month}</p>
        </div>
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      {/* Salary Breakdown */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4 border-b">Earnings</th>
            <th className="text-right py-2 px-4 border-b">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Basic Pay</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.basicPay}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">House Rent Allowance (HRA)</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.hra}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Other Allowances</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.allowances}
            </td>
          </tr>
          <tr className="font-bold">
            <td className="py-2 px-4 border-b">Total Earnings</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.basicPay +
                employeeDetails.hra +
                employeeDetails.allowances}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border-t border-gray-300 mb-4"></div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4 border-b">Deductions</th>
            <th className="text-right py-2 px-4 border-b">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Tax and Other Deductions</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.deductions}
            </td>
          </tr>
          <tr className="font-bold">
            <td className="py-2 px-4 border-b">Total Deductions</td>
            <td className="text-right py-2 px-4 border-b">
              {employeeDetails.deductions}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border-t border-gray-300 mb-4"></div>

      {/* Net Pay */}
      <div className="text-lg font-bold text-right">
        <p>
          Net Pay: ₹<span>{employeeDetails.netPay}</span>
        </p>
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-gray-500">
          *This is a computer-generated document and does not require a
          signature.
        </p>
      </div>
    </div>
  );
};

export default SalarySlip;
