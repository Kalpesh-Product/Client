import { periods } from "../../../../utils/payrollData";

export default function PayrollTimeLine() {
  const statusStyles = {
    COMPLETED: "text-green-600 bg-green-100",
    CURRENT: "text-blue-600 bg-blue-100",
    UPCOMING: "text-gray-500 bg-gray-100",
  };
  return (
    <div className="flex space-x-4 overflow-auto py-2">
      {periods.map((period, index) => (
        <div
          key={index}
          className={`flex flex-col bg-white items-center px-4 py-2 border rounded-md ${
            period.active ? "border-blue-500 shadow-md" : "border-gray-300"
          }`}
        >
          <div className="text-sm font-semibold text-gray-800">
            {period.month}
          </div>
          <div className="text-xs text-gray-600">{period.range}</div>
          <div
            className={`mt-2 text-xs font-medium px-2 py-1 rounded-full ${
              statusStyles[period.status]
            }`}
          >
            {period.status}
          </div>
        </div>
      ))}
    </div>
  );
}
