import AgTable from "../../components/AgTable";
const expenseData = [
  {
    id: 1,
    category: "Office Supplies",
    expenseName: "Stationery",
    urlLink: "link",
    vendorName: "OfficeMart",
    amount: 120.5,
    invoiceNo: "INV12345",
    invoiceDate: "2024-12-01",
    invoiceLink: "link",
    emailNotification: true,
  },
  {
    id: 2,
    category: "Software",
    expenseName: "Subscription",
    urlLink: "link",
    vendorName: "TechSoft",
    amount: 399.99,
    invoiceNo: "INV67890",
    invoiceDate: "2024-12-03",
    invoiceLink: "link",
    emailNotification: false,
  },
];

const expenseColumns = [
  { field: "id", headerName: "ID" },
  { field: "category", headerName: "Category" },
  { field: "expenseName", headerName: "Expense Name" },
  { field: "urlLink", headerName: "URL Link" },
  { field: "vendorName", headerName: "Vendor Name" },
  { field: "amount", headerName: "Amount" },
  { field: "invoiceNo", headerName: "Invoice No" },
  { field: "invoiceDate", headerName: "Invoice Date" },
  { field: "invoiceLink", headerName: "Invoice Link" },
  { field: "emailNotification", headerName: "Email Notification" },
];

export default function PaymentTracker() {
  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl mb-4">Payment Tracker</h1>
      <AgTable data={expenseData} columns={expenseColumns} />
    </div>
  );
}
