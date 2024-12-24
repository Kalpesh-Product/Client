import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import useAuth from "../../hooks/useAuth";

const EmployeeProfile = ({ data }) => {
  const { auth: authUser } = useAuth();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "Abrar Shaikh",
    role: "Master Admin",
    designation: "Founder and CEO",
    company: "Biznest",
    Department: "All Department",
    email: "John@gmail.com",
    phone: "2345634567",
    address: "Opposite to Shrama Shakti Bhavan , Patto , Plazza, Panajim, Goa",
    dateOfBirth: "5/05/1981",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser); // Populate user data
    }
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);

    // Optional: Save logic here, e.g., API call
    if (isEditing) {
      console.log("Saved Data:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save updated data
    setIsEditing(false); // Exit edit mode
  };

  if (!authUser) return <p>Loading...</p>;

  const isProfilePage = location.pathname === "/profile";
  const isAccessPage = location.pathname === "/access";

  return (
    <div className="flex flex-col space-y-7 justify-center">
      <div className="flex justify-end space-x-4">
        {isProfilePage && (
          <button
            onClick={toggleEdit}
            className={`px-4 py-2 text-white rounded ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "wono-blue-dark hover:bg-[#3cbce7]"
            }`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-8 ">
        <div className="flex flex-col gap-8 border-r-[1px] border-gray-400 justify-center pl-8">
          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">Role:</span>
            <input
              name="role"
              value={
                isAccessPage ? data?.role : isProfilePage ? authUser.user.role.roleTitle : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white"
                  : "border-transparent bg-transparent"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>
          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">
              Department:
            </span>
            <input
              name="department"
              value={
                isAccessPage
                  ? data?.department
                  : isProfilePage
                  ? authUser.user.department?.map((dept)=>dept.name)
                  : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white"
                  : "border-transparent bg-transparent"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>
          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">
              Designation:
            </span>
            <input
              name="designation"
              value={
                isAccessPage
                  ? data?.designation
                  : isProfilePage
                  ? authUser.user.designation?.title
                  : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white w-30"
                  : "border-transparent bg-transparent w-30"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>

          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">DOB:</span>
            <input
              name="dateOfBirth"
              value={
                isAccessPage
                  ? data?.dateOfBirth
                  : isProfilePage
                  ? formData.dateOfBirth
                  : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white"
                  : "border-transparent bg-transparent"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>
        </div>

        <div className="flex flex-col gap-8 pl-10">
        <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">Company:</span>
            <input
              name="company"
              value={
                isAccessPage
                  ? data?.company
                  : isProfilePage
                  ? authUser.user.company?.companyName
                  : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white"
                  : "border-transparent bg-transparent"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>
          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">
              {isAccessPage ? data?.email : isProfilePage ? authUser.user.email : ""}
            </span>
          </div>
          <div className="flex items-center gap-20">
            <span className="w-24 font-semibold text-gray-600">Phone:</span>
            <input
              name="phone"
              value={
                isAccessPage ? data?.phone : isProfilePage ? authUser.user.phone : ""
              }
              onChange={handleChange}
              className={`text-gray-800 border ${
                isEditing
                  ? "border-gray-400 bg-white"
                  : "border-transparent bg-transparent"
              } rounded`}
              disabled={!isEditing}
            ></input>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
