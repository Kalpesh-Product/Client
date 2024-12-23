import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

const SopPdf = () => {
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
          className="max-w-3xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg p-8 bg-white">
          <h1 className="text-3xl font-bold text-center mb-6">
            Standard Operating Procedure (SOP)
          </h1>

          {/* SOP Header */}
          <div className="grid grid-cols-2 text-sm mb-6">
            <div>
              <p className="font-semibold">SOP Title:</p>
              <p>Procedure for [SOP Title]</p>
            </div>
            <div>
              <p className="font-semibold">Department:</p>
              <p>[Department Name]</p>
            </div>
            <div>
              <p className="font-semibold">Prepared By:</p>
              <p>[Preparer Name]</p>
            </div>
            <div>
              <p className="font-semibold">Effective Date:</p>
              <p>[Effective Date]</p>
            </div>
            <div>
              <p className="font-semibold">Review Date:</p>
              <p>[Review Date]</p>
            </div>
          </div>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Objective */}
          <h2 className="text-xl font-bold mb-4">Objective</h2>
          <p className="text-sm mb-6">
            The objective of this SOP is to establish a standardized process for{" "}
            <span className="font-semibold">[Objective]</span> to ensure
            consistent and efficient outcomes.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Scope */}
          <h2 className="text-xl font-bold mb-4">Scope</h2>
          <p className="text-sm mb-6">
            This SOP applies to all employees within the{" "}
            <span className="font-semibold">[Department/Area]</span> and covers
            the following activities:
          </p>
          <ul className="text-sm list-disc pl-5 mb-6">
            <li>[Activity 1]</li>
            <li>[Activity 2]</li>
            <li>[Activity 3]</li>
          </ul>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Responsibilities */}
          <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
          <ul className="text-sm list-disc pl-5 mb-6">
            <li>
              <span className="font-semibold">[Role 1]:</span> Responsible for
              [Responsibility].
            </li>
            <li>
              <span className="font-semibold">[Role 2]:</span> Oversees
              [Responsibility].
            </li>
            <li>
              <span className="font-semibold">[Role 3]:</span> Ensures
              compliance with [Regulation/Process].
            </li>
          </ul>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Procedure */}
          <h2 className="text-xl font-bold mb-4">Procedure</h2>
          <ol className="text-sm list-decimal pl-5 mb-6">
            <li>Step 1: [Description of Step 1]</li>
            <li>Step 2: [Description of Step 2]</li>
            <li>Step 3: [Description of Step 3]</li>
            <li>Step 4: [Description of Step 4]</li>
            <li>Step 5: [Description of Step 5]</li>
          </ol>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Compliance */}
          <h2 className="text-xl font-bold mb-4">Compliance</h2>
          <p className="text-sm mb-6">
            All employees are required to adhere to this SOP. Non-compliance may
            result in disciplinary action as per company policy.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Review and Approvals */}
          <h2 className="text-xl font-bold mb-4">Review and Approvals</h2>
          <div className="grid grid-cols-2 text-sm">
            <div>
              <p className="font-semibold">Prepared By:</p>
              <p>_________________________</p>
              <p className="mt-2">[Preparer Name]</p>
            </div>
            <div>
              <p className="font-semibold">Approved By:</p>
              <p>_________________________</p>
              <p className="mt-2">[Approver Name]</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              *This SOP is subject to revision. Ensure to refer to the latest
              version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SopPdf;
