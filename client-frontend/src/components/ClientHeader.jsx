import React, { useState } from "react";
import BiznestLogo from "../LandingPageImages/biz-nest.png";
import { BsFillGridFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import MainModules from "./MainModules";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Popover,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../contexts/TimerContext";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

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

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);

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
            open={isPopoverOpen}
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
            />
            <div>
              <Typography
                onClick={() => {
                  setAnchorEl(null);
                }}
                variant="h6"
                sx={{ px: 2, py: "0", color: "white" }}
              >
                {authUser.user.name}
              </Typography>
              {isRunning ? <p className="text-white text-sm">{timer}</p> : ""}
            </div>
          </IconButton>

          {/* Menu */}
          <Menu
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
          </Menu>
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
