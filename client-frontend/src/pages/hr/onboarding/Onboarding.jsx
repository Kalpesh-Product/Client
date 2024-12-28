import React, { useState, useEffect } from "react";
import AgTable from "../../../components/AgTable";
import WonoButton from "../../../components/Buttons/WonoButton";
import { NewModal } from "../../../components/NewModal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import OnBoardingForm from "./OnBoardingForm";
import FormStepper from "../../../components/FormStepper";
import UserCard from "../../../components/UserCard";
import axios from "axios"

const Onboarding = () => {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/fetch-users");
        setUsers(response.data.users);

        // Map the response to match table columns
        const formattedData = response.data.users.map((user) => ({
          id: user.empId, // Assuming the field in the API is empID
          department: user.department.map((dept)=>dept.name),
          role: user.role.roleTitle,
          manager: user.reportsTo?.name,
          startDate: user.startDate, // Assuming the field in the API is startDate
        }));

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  console.log(users)

  const modalStyle = {
    width: "80vw",
    minHeight: "70vh",
  };
  const columns = [
    { headerName: "empID", field: "id", flex: 1 },
    { headerName: "Department", field: "department" },
    { headerName: "Role", field: "role" },
    { headerName: "Manager", field: "manager" },
    { headerName: "Started", field: "startDate" },
  ];

  // Sample data for the table
  // const tableData = [
  //   {
  //     id: "E101",
  //     department: "Tech",
  //     role: "Software Engineer",
  //     manager: "John Doe",
  //     joinedDate: "2023-01-15",
  //   },
  //   {
  //     id: "E102",
  //     department: "HR",
  //     role: "HR Manager",
  //     manager: "Jane Smith",
  //     joinedDate: "2023-02-20",
  //   },
  //   {
  //     id: "E103",
  //     department: "Finance",
  //     role: "Accountant",
  //     manager: "Robert Brown",
  //     joinedDate: "2023-03-10",
  //   },
  //   {
  //     id: "E104",
  //     department: "Tech",
  //     role: "Frontend Developer",
  //     manager: "John Doe",
  //     joinedDate: "2023-04-25",
  //   },
  // ];

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
        <div className="bg-white rounded-md py-4">
          <div>
          <OnBoardingForm handleClose={handleCloseModal} />
          </div>
          {/* <div className="flex justify-end pb-3">
            <WonoButton
              content={"Add Employee"}
              onClick={() => handleOpenModal("add")}
            />
          </div> */}
          {/* <AgTable data={tableData} columns={columns} /> */}
        </div>

        <div>
       
          {/* <div className="grid grid-cols-2">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div> */}
        </div>
      </div>
{/* 
      <NewModal
        styles={modalStyle}
        open={!!openModal}
        onClose={handleCloseModal}
      >
        {openModal === "add" && (
          <>
            <OnBoardingForm handleClose={handleCloseModal} />
          </>
        )}
      </NewModal> */}
    </div>
  );
};

export default Onboarding;
