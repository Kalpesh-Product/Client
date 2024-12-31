import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

const EmployeeAgreementPdf = () => {
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
        
          <button
            onClick={downloadPDF}
            className="wono-blue-dark text-white px-6 py-3 rounded shadow">
            Download as PDF
          </button>
        </div>
        <div
          id="yellowDiv"
          className="max-w-3xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg p-8 bg-white">

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Agreement Introduction */}
          <p className="text-sm mb-6">
            This Employment Agreement ("Agreement") is entered into on{" "}
            <span className="font-semibold">23-12-2024</span> by and between{" "}
            <span className="font-semibold">Farzeen Qadri</span>, with its
            principal office located at{" "}
            <span className="font-semibold">Singapore</span> (the "Employer"),
            and <span className="font-semibold">{employeeDetails.name}</span>,
            residing at <span className="font-semibold">Panaji</span> (the
            "Employee").
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Employee Details */}
          <h2 className="text-xl font-bold mb-4">Employee Details</h2>
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
          </div>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Job Description */}
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <p className="text-sm mb-6">
            The Employee is hereby hired as{" "}
            <span className="font-semibold">{employeeDetails.designation}</span>{" "}
            in the{" "}
            <span className="font-semibold">{employeeDetails.department}</span>{" "}
            department. The Employee agrees to perform the duties outlined by
            the Employer to the best of their ability and adhere to the
            Employer’s policies and guidelines.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Compensation */}
          <h2 className="text-xl font-bold mb-4">Compensation</h2>
          <p className="text-sm mb-6">
            The Employee will be compensated with a monthly salary of{" "}
            <span className="font-semibold">₹{employeeDetails.netPay}</span>,
            which includes the following breakdown:
          </p>
          <ul className="text-sm list-disc pl-5 mb-6">
            <li>Basic Pay: ₹{employeeDetails.basicPay}</li>
            <li>HRA: ₹{employeeDetails.hra}</li>
            <li>Other Allowances: ₹{employeeDetails.allowances}</li>
          </ul>
          <p className="text-sm mb-6">
            Deductions such as taxes and statutory contributions of ₹
            {employeeDetails.deductions} will apply.
          </p>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Terms and Conditions */}
          <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
          <ul className="text-sm list-disc pl-5 mb-6">
            <li>The employment is effective from [Start Date].</li>
            <li>
              Either party may terminate this agreement with a [Notice Period
              Duration] notice in writing.
            </li>
            <li>
              The Employee must maintain confidentiality regarding company
              matters.
            </li>
            <li>
              The Employee agrees to adhere to company policies and standards.
            </li>
          </ul>

          <div className="border-t border-gray-300 mb-4"></div>

          {/* Signatures */}
          <h2 className="text-xl font-bold mb-4">Signatures</h2>
          <div className="flex justify-between text-sm mt-6">
            <div>
              <p className="font-semibold">Employer:</p>
              <p className="mt-8">_________________________</p>
              <p className="mt-2">[Employer Name]</p>
            </div>
            <div>
              <p className="font-semibold">Employee:</p>
              <p className="mt-8">_________________________</p>
              <p className="mt-2">{employeeDetails.name}</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              *This agreement is legally binding and has been executed
              electronically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAgreementPdf;
