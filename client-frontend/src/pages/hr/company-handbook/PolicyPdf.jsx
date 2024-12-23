import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

const PolicyPdf = () => {
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
        <div className="flex items-center justify-end w-full">
          {/* <FormControl size="small" style={{ minWidth: 220 }}>
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
          </FormControl> */}

          <button
            onClick={downloadPDF}
            className="wono-blue-dark text-white px-6 py-3 rounded shadow">
            Download as PDF
          </button>
        </div>
        <div
          id="yellowDiv"
          className="max-w-xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg p-6 bg-white text-sm">
          <h1 className="text-2xl font-bold text-center mb-4">
            Company Leave Policy
          </h1>

          {/* Policy Overview */}
          <p className="mb-4">
            This policy outlines the leave entitlements, procedures, and rules
            for employees of{" "}
            <span className="font-semibold">[Company Name]</span>.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Types of Leave */}
          <h2 className="text-lg font-bold mb-2">Types of Leave</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <span className="font-semibold">Annual Leave:</span> [X] days per
              year.
            </li>
            <li>
              <span className="font-semibold">Sick Leave:</span> [X] days per
              year (certificate required).
            </li>
            <li>
              <span className="font-semibold">Maternity/Paternity Leave:</span>{" "}
              As per labor laws.
            </li>
            <li>
              <span className="font-semibold">Emergency Leave:</span> Up to [X]
              days (approval required).
            </li>
            <li>
              <span className="font-semibold">Unpaid Leave:</span> Subject to
              approval.
            </li>
          </ul>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Leave Application Process */}
          <h2 className="text-lg font-bold mb-2">Leave Application Process</h2>
          <ol className="list-decimal pl-5 mb-4">
            <li>Submit a request via the HR portal or in writing.</li>
            <li>Provide at least [X] days of notice for planned leaves.</li>
            <li>
              Notify your supervisor immediately for unplanned leaves (e.g.,
              sick leave).
            </li>
            <li>Obtain approval and record leave in the system.</li>
          </ol>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Leave Entitlement */}
          <h2 className="text-lg font-bold mb-2">Leave Entitlement</h2>
          <p className="mb-4">
            Leave entitlements are calculated annually. Unused leave may be
            carried forward up to [X] days or forfeited, depending on company
            policy.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* General Rules */}
          <h2 className="text-lg font-bold mb-2">General Rules</h2>
          <ul className="list-disc pl-5 mb-4">
            <li>Leave is subject to management approval.</li>
            <li>
              Unauthorized absences may result in unpaid leave or disciplinary
              action.
            </li>
            <li>Critical business periods require prior approval.</li>
          </ul>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Acknowledgment */}
          <h2 className="text-lg font-bold mb-2">Acknowledgment</h2>
          <p className="mb-4">
            By signing below, the employee acknowledges understanding and
            agreeing to abide by this policy.
          </p>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-semibold">Employee Name:</p>
              <p>_________________________</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>_________________________</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              *For any clarifications, contact the HR department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPdf;
