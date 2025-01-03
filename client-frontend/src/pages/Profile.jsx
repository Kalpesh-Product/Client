import React, { useState, useEffect } from "react";
import EmployeeProfile from "../components/AccessTabViewModel/EmployeeProfile";
import AccessHierarchyTab from "../components/AccessTabViewModel/AccessHierarchyTab";
import TestSide from "../components/Sidetest";
import MasterAdmin from "../assets/abrar.jpeg";
import Profilepic from "../assets/profile.jpg";
import { TbCameraPlus } from "react-icons/tb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SuperAdmin from "../assets/kashif-bg.png";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MyTickets from "./cms/tickets/components/MyTickets";
import MyBookings from "./cms/room-booking/MyBookings";
import MyAssets from "../pages/cms/asset/MyAssets";
import { NewModal } from "../components/NewModal";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import useAuth from "../hooks/useAuth";
// import image from "../profile.jpg";

const Profile = () => {
  const { auth: authUser } = useAuth();
  console.log(authUser)
  const [IsAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeTab, setActiveTab] = useState("tab-1");
  const [userData, setUserData] = useState("");
  const [uploadProfileImage, setUploadProfileImage] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser); // Populate user data
    }
  }, []);

  useEffect(() => {
    console.log(userData); // This will log the updated user data after it changes
  }, [userData]); // This will run when userData changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => setImage(reader.result); // set the image to display in the container
    //   reader.readAsDataURL(file);
    // }
  };

  const modules = {
    HR: [
      "Attendance",
      "Leave Management",
      "Payroll",
      "Payslips",
      "Leaves",
      "Holidays",
      "SOPs",
      "Policies",
      "Task Management",
      "Performance",
      "Appraisals",
      "Templates",
      "e-Signs",
    ],
    Sales: [
      "Automated SEO",
      "Personalized SEMs",
      "Ad Networks",
      "Lead Generation",
      "Social Media",
      "Email Marketing",
      "Whatssapp Integration",
      "Live chats",
      "Refferals",
      "Blogs",
      "Vlogs",
    ],
    Finance: [
      "Invoices",
      "Cashflow",
      "Projections",
      "Budgets",
      "Working Capital",
      "Financial Reports",
      "Collections",
      "Notifications",
      "FollowUps",
      "Taxes",
      "Compliances",
      "Analytics",
    ],
    Marketing: ["Campaigns", "Analytics", "Social Media"],
    Tickets: ["Open Tickets", "Resolved Tickets", "Escalations"],
    "Meeting Room": ["Booking", "Schedule", "Calendar"],
  };

  const handleCheckboxChange = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };
  return (
    <div class="flex min-h-screen">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div class="flex-1 py-4 h-full overflow-y-auto motion-preset-blur-right-md">
        <h1 class="text-2xl font-bold mb-4">Profile</h1>
        <div class="flex items-center p-4 bg-white rounded-lg shadow-md justify-between">
          <div class="flex flex-row gap-3 relative">
            <div
              onClick={() => setUploadProfileImage(true)}
              className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
              <img
                src={
                  userData?.role === "Master Admin"
                    ? MasterAdmin
                    : userData?.role === "Super Admin"
                    ? SuperAdmin
                    : Profilepic
                }
                alt="Profile Logo"
                class="w-16 h-16 rounded-full border-4 border-[#0DB4EA] mr-4"></img>
            </div>
            <span className="p-1 absolute left-11 top-10 cursor-pointer rounded-full bg-p wono-blue-dark">
              <TbCameraPlus
                size={15}
                color="white"
                onClick={() => setUploadProfileImage(true)}
              />
            </span>
            <div>
              <h2 class="text-xl font-semibold">{authUser?.user.name}</h2>
              <p class="text-gray-500">Active</p>
            </div>
          </div>
        </div>
        {/* <!-- Horizontal Divider --> */}
        <hr class="border-t border-gray-300 my-4" />

        <div className="mx-auto">
          <ul className="flex  gap-4 bg-white p-2 rounded-t-md">
            <li className=" text-center w-1/2" role="presentation">
              <button
                className={`text-md py-2 w-full hover:bg-gray-100  ${
                  activeTab === "tab-1"
                    ? "border-b-4 border-[#0DB4EA] text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("tab-1")}>
                Profile
              </button>
            </li>
            <li className=" text-center w-1/2" role="presentation">
              <button
                className={`text-md py-2 w-full hover:bg-gray-100 ${
                  activeTab === "tab-2"
                    ? "border-b-4 border-[#0DB4EA] text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("tab-2")}>
                Access
              </button>
            </li>
            <li className=" text-center w-1/2" role="presentation">
              <button
                className={`text-md py-2 w-full hover:bg-gray-100 ${
                  activeTab === "tab-3"
                    ? "border-b-4 border-[#0DB4EA] text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("tab-3")}>
                Assets
              </button>
            </li>
            <li className=" text-center w-1/2" role="presentation">
              <button
                className={`text-md py-2 w-full hover:bg-gray-100 ${
                  activeTab === "tab-4"
                    ? "border-b-4 border-[#0DB4EA] text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("tab-4")}>
                Credits
              </button>
            </li>
            <li className=" text-center w-1/2" role="presentation">
              <button
                className={`text-md py-2 w-full hover:bg-gray-100 ${
                  activeTab === "tab-5"
                    ? "border-b-4 border-[#0DB4EA] text-blue-600"
                    : ""
                }`}
                onClick={() => setActiveTab("tab-5")}>
                Tickets
              </button>
            </li>
          </ul>
          <div className="tab-content bg-white rounded-b-md pb-4">
            {activeTab === "tab-1" && (
              <div
                className="tab-pane motion-preset-slide-up show active"
                id="tab-1"
                role="tabpanel">
                <div
                  className="flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay="100">
                  <EmployeeProfile
                    data={{
                      name: "Abrar Shaikh",
                      role: "Manager",
                      designation: "TopManagement",
                      email: "abrar.shaikh@example.com",
                      company: "ABC Corp",
                      department: "TopManagement",
                      phone: "+1234567890",
                      address: "123 Main St, Cityville",
                      dateOfBirth: "1975-02-15",
                    }}
                  />
                </div>
              </div>
            )}
            {activeTab === "tab-2" && (
              <div
                className="tab-pane motion-preset-slide-up-sm show"
                id="tab-2"
                role="tabpanel">
                <div
                  className="flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay="100">
                  {/* Tab 2 Content */}
                  <AccessHierarchyTab />
                </div>
              </div>
            )}
            {activeTab === "tab-3" && (
              <div
                className="tab-pane motion-preset-slide-up-sm show"
                id="tab-2"
                role="tabpanel">
                <div
                  className="flex flex-col h-full"
                  data-aos="fade-up"
                  data-aos-delay="100">
                  <div className="bg-white rounded-lg overflow-hidden inline-block">
                    {/* <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ fontFamily: "Popins-SemiBold" }}
                      >
                        IT
                      </AccordionSummary>
                      <AccordionDetails>
                        {userData.assignedAsset}
                      </AccordionDetails>
                    </Accordion> */}
                    <MyAssets />
                    {/* <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ fontFamily: "Popins-SemiBold" }}
                      >
                        Maintainance
                      </AccordionSummary>
                      <AccordionDetails>
                        5001 - Chair - Herman Miller
                      </AccordionDetails>
                    </Accordion> */}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tab-4" && (
              <div
                className="tab-pane motion-preset-slide-up-sm show"
                id="tab-4"
                role="tabpanel">
                {/* Credits Summary Section */}
                <div className="grid p-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 w-full">
                  {/* Total Credits Widget */}
                  <div className="p-4 bg-blue-50 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-blue-600">
                      Total Credits
                    </h4>
                    <p className="text-2xl font-bold text-blue-800">1000</p>
                  </div>

                  {/* Remaining Credits Widget */}
                  <div className="p-4 bg-green-50 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-green-600">
                      Remaining Credits
                    </h4>
                    <p className="text-2xl font-bold text-green-800">450</p>
                  </div>

                  {/* Room Booking Summary Widget */}
                  <div className="p-4 bg-yellow-50 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-yellow-600">
                      Rooms Booked
                    </h4>
                    <p className="text-2xl font-bold text-yellow-800">
                      15 Bookings
                    </p>
                  </div>
                </div>

                {/* Data Grid Section */}
                <div className="bg-white py-4 w-full">
                  <MyBookings />
                </div>
              </div>
            )}
            {activeTab === "tab-5" && (
              <div
                className="tab-pane motion-preset-slide-up-sm show"
                id="tab-5"
                role="tabpanel">
                <div className="bg-white py-4 w-full">
                  <h3 className="text-xl font-bold mb-4">My Tickets</h3>
                  <div style={{ height: 400, width: "100%" }}>
                    <MyTickets />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Image Upload */}

      {uploadProfileImage && (
        <NewModal
          open={uploadProfileImage}
          onClose={() => setUploadProfileImage(false)}>
          <div className="bg-white p-4 rounded-lg w-80">
            <div className="flex justify-between pb-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Upload Profile Image
                </h3>
              </div>
              <div>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setUploadProfileImage(false)}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
                  <IoMdClose />
                </motion.button>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <button
              onClick={() => setUploadProfileImage(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Save
            </button>
          </div>
        </NewModal>
      )}

      {/* modal for service access */}
      {IsAccessModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-100">
            <div className="mx-auto">
              <ul className="flex justify-center border-b mb-4">
                <li className="w-1/2 text-center" role="presentation">
                  <button
                    className="text-lg py-2 w-full font-semibold hover:bg-gray-100 focus:bg-gray-200 "
                    onClick={() => setActiveTab("tab-1")}>
                    PROFILE
                  </button>
                </li>
                <li className="w-1/2 text-center" role="presentation">
                  <button
                    className="text-lg py-2 w-full font-semibold hover:bg-gray-100 focus:bg-gray-200 "
                    onClick={() => setActiveTab("tab-2")}>
                    ACCESS
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === "tab-1" && (
                  <div
                    className="tab-pane fade show active"
                    id="tab-1"
                    role="tabpanel">
                    <div
                      className="flex flex-col items-center justify-center"
                      data-aos="fade-up"
                      data-aos-delay="100">
                      <EmployeeProfile />
                    </div>
                  </div>
                )}
                {activeTab === "tab-2" && (
                  <div
                    className="tab-pane fade show"
                    id="tab-2"
                    role="tabpanel">
                    <div
                      className="flex flex-col items-center justify-center"
                      data-aos="fade-up"
                      data-aos-delay="100">
                      {/* Tab 2 Content */}
                      <p>Your Apply Now content here...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsAccessModalOpen(false)}
              className="w-full bg-[#0DB4EA] text-white py-2 rounded-lg hover:bg-blue-600">
              Save & Close
            </button>
          </div>
        </div>
      )}
      {/* modal for update profile */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold text-center mb-4">
              Update Profile
            </h3>
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
