import React, { useState } from "react";
import AgTable from "../../../components/AgTable";
import WonoButton from "../../../components/Buttons/WonoButton";
import { NewModal } from "../../../components/NewModal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import OnBoardingForm from "./OnBoardingForm";
import FormStepper from "../../../components/FormStepper";

const Onboarding = () => {
  const [openModal, setOpenModal] = useState(false);
  // Define columns
  const columns = [
    { headerName: "empID", field: "id", flex: 1 },
    { headerName: "Department", field: "department" },
    { headerName: "Role", field: "role" },
    { headerName: "Manager", field: "manager" },
    { headerName: "Joined", field: "joinedDate" },
  ];

  // Sample data for the table
  const tableData = [
    {
      id: "E101",
      department: "Tech",
      role: "Software Engineer",
      manager: "John Doe",
      joinedDate: "2023-01-15",
    },
    {
      id: "E102",
      department: "HR",
      role: "HR Manager",
      manager: "Jane Smith",
      joinedDate: "2023-02-20",
    },
    {
      id: "E103",
      department: "Finance",
      role: "Accountant",
      manager: "Robert Brown",
      joinedDate: "2023-03-10",
    },
    {
      id: "E104",
      department: "Tech",
      role: "Frontend Developer",
      manager: "John Doe",
      joinedDate: "2023-04-25",
    },
  ];

  const handleOpenModal = (type) => {
    setOpenModal(type);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleAddEmployee = () => {
    console.log("Employee add clicked");
  };
  return (
    <div>
      <h1 className="wono-title">Onboarding</h1>
      <div>
        <div className="bg-white rounded-md p-2">
          <div className="flex justify-end pb-3">
            <WonoButton
              content={"Add Employee"}
              onClick={() => handleOpenModal("add")}
            />
          </div>
          <AgTable data={tableData} columns={columns} />
        </div>
      </div>

      <NewModal open={!!openModal} onClose={handleCloseModal}>
        {openModal === "add" && (
          <>
            <OnBoardingForm handleClose={handleCloseModal} />
          </>
        )}
      </NewModal>
    </div>
  );
};

export default Onboarding;
