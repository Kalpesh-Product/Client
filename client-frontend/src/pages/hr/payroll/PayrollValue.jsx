import AgTable from "../../../components/AgTable";
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

  // Column Definitions for Ag-Grid
  const tableColumns = [
    {
      headerName: "Department",
      field: "department",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payroll (₹)",
      field: "payroll",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `₹${params.value.toLocaleString()}`, 
    },
  ];

  return (
    <div className="p-4 bg-gray-100 w-[80vw] md:w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payroll Table</h2>
      <AgTable
        data={tableData}
        columns={tableColumns}
        paginationPageSize={5}
        highlightFirstRow={false}
        highlightEditedRow={false}
      />
    </div>
  );
};

export default PayrollValue;
