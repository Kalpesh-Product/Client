export default function MyPayroll({ payrollDetails }) {
  // Payroll details destructuring
  const { employeeName, payPeriod, grossSalary, deductions, netSalary } =
    payrollDetails;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Payroll</h2>
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Employee: {employeeName}
        </h3>
        <p className="text-gray-600">Pay Period: {payPeriod}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Gross Salary:</span>
          <span className="text-gray-800">₹{grossSalary.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Deductions:</span>
          <span className="text-red-600">- ₹{deductions.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-medium text-gray-700">Net Salary:</span>
          <span className="text-green-600 font-semibold">
            ₹{netSalary.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
