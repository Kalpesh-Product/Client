import React, { useState } from "react";
import BiznestLogo from "../LandingPageImages/biz-nest.png";
import {
  Avatar,
  Menu,
  MenuItem,
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
import MainModules from "../components/MainModules"

const ClientHeader = () => {
  const navigate = useNavigate();
  const { timer, isRunning } = useTimer();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const { auth: authUser } = useAuth();
  const logout = useLogout();

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
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
          {/* Popover */}
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

          <div></div>

          {/* Menu */}
          {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="py-0">
              <MenuItem
                onClick={() => {
                  navigate("/landing");
                  setAnchorEl(null);
                }}
              >
                <Typography>Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </div>
          </Menu> */}

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
