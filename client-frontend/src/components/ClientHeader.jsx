import React, { useState } from "react";
import BiznestLogo from "../LandingPageImages/biz-nest.png";
import {
  Avatar,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Badge,
  Typography,
  IconButton,
  Box,
  Divider,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../contexts/TimerContext";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { BsFillGridFill } from "react-icons/bs";
import MainModules from "../components/MainModules";
import { IoMdNotifications } from "react-icons/io";

const ClientHeader = () => {
  const navigate = useNavigate();
  const { timer, isRunning } = useTimer();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [notificationPopoverAnchorEl, setNotificationPopoverAnchorEl] =
    useState(null);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { auth: authUser } = useAuth();
  const logout = useLogout();

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };
  const handleNotificationPopoverOpen = (event) => {
    setNotificationPopoverAnchorEl(event.currentTarget);
  };
  const handlNotificationsClose = () => {
    setNotificationPopoverAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const isModulePopover = Boolean(popoverAnchorEl);
  const isNotificationPopver = Boolean(notificationPopoverAnchorEl);

  // Example data for notifications
  const notifications = [
    {
      type: "all",
      items: [
        {
          name: "John Doe",
          message: "You have a new comment on your post.",
          profilePic: "/path-to-profile.jpg",
          count: 2,
        },
        {
          name: "Jane Smith",
          message: "Your team updated the project.",
          profilePic: "/path-to-profile.jpg",
          count: 0,
        },
      ],
    },
    {
      type: "team",
      items: [
        {
          name: "Team Lead",
          message: "New task assigned to you.",
          profilePic: "/path-to-profile.jpg",
          count: 3,
        },
      ],
    },
    {
      type: "direct",
      items: [
        {
          name: "Alex Johnson",
          message: "Can we discuss the meeting?",
          profilePic: "/path-to-profile.jpg",
          count: 1,
        },
      ],
    },
  ];

  const getNotificationsForTab = () => {
    if (activeTab === 0)
      return notifications.find((n) => n.type === "all").items;
    if (activeTab === 1)
      return notifications.find((n) => n.type === "team").items;
    if (activeTab === 2)
      return notifications.find((n) => n.type === "direct").items;
  };

  const currentNotifications = getNotificationsForTab();

  return (
    <>
      <header className="bg-black text-white py-4 px-6 pr-16 flex justify-between items-center sticky top-0 z-40">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold">
            <img
              src={BiznestLogo}
              onClick={() => {
                navigate("/");
              }}
              alt=""
              className="rounded cursor-pointer"
            />
          </span>
        </div>
        {/* Navigation Links */}
        <nav className="flex justify-between py-0 items-center w-[15%]">
          <span
            onClick={handleNotificationPopoverOpen}
            className="p-4 cursor-pointer"
          >
            <IoMdNotifications />
          </span>

          <Popover
            open={isNotificationPopver}
            anchorEl={notificationPopoverAnchorEl}
            onClose={handlNotificationsClose}
            sx={{ marginTop: "1rem" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="w-full p-3">
              <Box className="w-full p-1">
                {/* Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="All" />
                  <Tab label="Team" />
                  <Tab label="Direct" />
                </Tabs>

                {/* Notifications Content */}
                <Box mt={2}>
                  {currentNotifications.map((notification, index) => (
                    <div
                      key={index}
                      className="flex justify-start gap-5 items-center w-full border-b pb-2 mb-2"
                    >
                      <Box className="flex flex-col">
                        <div className="flex gap-3 items-center">
                          <div className="flex items-start justify-center">
                            {/* Profile Picture */}
                            <Avatar
                              alt={notification.name}
                              src={notification.profilePic}
                              sx={{ width: 30, height: 30, mr: 0 }}
                            />
                          </div>
                          <div className="px-1 py-0">
                            {/* Name */}
                            <span className="font-semibold">
                              {notification.name}
                            </span>
                            <div>
                              <span>{notification.message}</span>
                            </div>
                          </div>
                        </div>
                      </Box>
                      <div className="flex pr-4">
                        {/* Message Count */}
                        {notification.count > 0 && (
                          <Badge
                            badgeContent={notification.count}
                            color="error"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </Box>
              </Box>
            </div>
          </Popover>

          {/* Module */}
          <span onClick={handlePopoverOpen} className="p-4 cursor-pointer">
            <BsFillGridFill />
          </span>
          <Popover
            sx={{ marginTop: "1rem" }}
            open={isModulePopover}
            anchorEl={popoverAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="p-4 min-w-[25vw]">
              <MainModules closePopover={handlePopoverClose} />
            </div>
          </Popover>

          {/* Avatar Menu Trigger */}
          <IconButton onClick={handleMenuOpen} sx={{ py: 0 }}>
            <Avatar
              className="wono-blue-dark"
              alt={authUser.user.name}
              src="/path-to-avatar.jpg"
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <div>
              {/* <Typography variant="h6" sx={{ px: 2, py: "0", color: "white" }}>
                {authUser.user.name}
              </Typography> */}
              {isRunning ? <p className="text-white text-sm">{timer}</p> : ""}
            </div>
          </IconButton>

          {/* Popover */}
          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            sx={{ marginTop: "1rem" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="w-64 p-3">
              {/* Header */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  alt={authUser.user.name}
                  src="/path-to-avatar.jpg"
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {authUser.user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {authUser.user.email}
                  </Typography>
                </Box>
              </Box>

              {/* Menu Items */}
              <Divider />
              <div className="mt-1 flex flex-col">
                <div
                  className="cursor-pointer hover:bg-gray-100 rounded-md py-2"
                  onClick={() => {
                    navigate("/profile");
                    setAnchorEl(null);
                  }}
                >
                  <i className="fas fa-user mr-2" />{" "}
                  {/* Replace with an appropriate icon */}
                  <span>Profile</span>
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-100 rounded-md py-2"
                  onClick={() => navigate("/inbox")}
                >
                  <i className="fas fa-envelope mr-2" />{" "}
                  {/* Replace with an appropriate icon */}
                  <span>Inbox</span>
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-100 rounded-md py-2"
                  onClick={() => navigate("/lockscreen")}
                >
                  <i className="fas fa-lock mr-2" />{" "}
                  {/* Replace with an appropriate icon */}
                  <span>Lock Screen</span>
                </div>
              </div>
              <Divider />
              <Box
                display="flex"
                alignItems="center"
                py={1}
                className="cursor-pointer hover:bg-gray-100 rounded-md mt-1"
                onClick={handleLogout}
                color="error.main"
              >
                <i className="fas fa-sign-out-alt mr-2" />{" "}
                {/* Replace with an appropriate icon */}
                <Typography variant="body2" color="error">
                  Sign Out
                </Typography>
              </Box>
            </div>
          </Popover>
        </nav>
      </header>

      {/* Modal for Image Upload */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Upload Company Logo</h3>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientHeader;
