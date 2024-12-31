import AgTable from "../../../../components/AgTable";

const MyPayslips = () => {
  // Payslip data
  const payslips = [
    {
      id: 1,
      month: "January 2024",
      salary: "₹40000",
      status: "Paid",
      employeeId: "EMP123",
      department: "Finance",
      paymentDate: "2024-01-05",
      deductions: "₹2000",
      bonuses: "₹5000",
      netPay: "₹43000",
    },
    {
      id: 2,
      month: "February 2024",
      salary: "₹40000",
      status: "Paid",
      employeeId: "EMP123",
      department: "Finance",
      paymentDate: "2024-02-05",
      deductions: "₹2000",
      bonuses: "₹4000",
      netPay: "₹42000",
    },
    {
      id: 3,
      month: "April 2024",
      salary: "₹40000",
      status: "Pending",
      employeeId: "EMP123",
      department: "Finance",
      paymentDate: "—",
      deductions: "₹2000",
      bonuses: "₹3000",
      netPay: "₹41000",
    },
  ];

  // Column definitions
  const columns = [
    {
      headerName: "Employee ID",
      field: "employeeId",
      sortable: true,
      filter: true,
    },
    { headerName: "Month", field: "month", sortable: true, filter: true },
    {
      headerName: "Department",
      field: "department",
      sortable: true,
      filter: true,
    },
    { headerName: "Salary", field: "salary", sortable: true, filter: true },
    {
      headerName: "Deductions",
      field: "deductions",
      sortable: true,
      filter: true,
    },
    { headerName: "Bonuses", field: "bonuses", sortable: true, filter: true },
    { headerName: "Net Pay", field: "netPay", sortable: true, filter: true },
    {
      headerName: "Payment Date",
      field: "paymentDate",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => {
        const statusClasses = {
          Paid: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Unpaid: "bg-red-100 text-red-800",
        };
        const className =
          statusClasses[params.value] || "bg-gray-100 text-gray-800";
        return (
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg py-4 w-full mt-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Payslips</h1>
      <AgTable
        data={payslips}
        columns={columns}
        paginationPageSize={5}
        highlightFirstRow={true}
        highlightEditedRow={false}
      />
    </div>
  );
};

export default MyPayslips;
