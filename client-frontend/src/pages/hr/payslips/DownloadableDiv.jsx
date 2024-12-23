import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

const DownloadableDiv = () => {
  const [month, setMonth] = useState("December 2024");
  const { auth } = useAuth();
  const employeeDetails = {
    name: auth.user.name,
    employeeId: auth.user.empId,
    designation: auth.user.role.roleTitle,
    department:
      auth.user.department.length > 1
        ? auth.user.department.map((dept) => dept.name).join(", ")
        : auth.user.department.map((dept) => dept.name),
    month,
    basicPay: 70000,
    hra: 15000,
    allowances: 10000,
    deductions: 5000,
    netPay: 90000,
  };

  const downloadPDF = () => {
    const input = document.getElementById("yellowDiv");

    // Hide buttons 2 and 3 temporarily
    const buttonsToHide = document.querySelectorAll(".hide-in-pdf");
    buttonsToHide.forEach((button) => {
      button.style.display = "none";
    });

    // Capture the content as a PDF
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // A4 width in mm (minus margins)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("download.pdf");

      // Revert the changes to show the buttons back
      buttonsToHide.forEach((button) => {
        button.style.display = "";
      });
    });
  };

  return (
    <div className="relative">
      <div className=" pb-10 flex-col flex items-center justify-center">
        <div className="flex items-center justify-between w-full">
          <FormControl size="small" style={{ minWidth: 220 }}>
            <TextField
              label="Select Month"
              variant="outlined"
              select
              size="small"
              onChange={(e) => setMonth(e.target.value)}
              sx={{ fontSize: "0.5rem" }}>
              <MenuItem value="December 2024">December 2024</MenuItem>
              <MenuItem value="November 2024">November 2024</MenuItem>
              <MenuItem value="October 2024">October 2024</MenuItem>
              <MenuItem value="September 2024">September 2024</MenuItem>
            </TextField>
          </FormControl>

          <button
            onClick={downloadPDF}
            className="wono-blue-dark text-white px-6 py-3 rounded shadow">
            Download as PDF
          </button>
        </div>
        <div
          id="yellowDiv"
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
                <td className="py-2 px-4 border-b">
                  House Rent Allowance (HRA)
                </td>
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
      </div>
    </div>
  );
};

export default DownloadableDiv;
