import React, { useEffect, useState } from "react";
import BiznestLogo from "../LandingPageImages/biz-nest.png";
import { Avatar, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClientHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [image, setImage] = useState("");
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("")

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"))
    setUser(storedUser)
  },[])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result); // set the image to display in the container
      reader.readAsDataURL(file);
    }
    setIsModalOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <header className="bg-black text-white py-4 px-6 pr-16 flex justify-between items-center sticky top-0 z-40">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold">
            <img
              src={BiznestLogo}
              onClick={() => {
                navigate("/landing");
              }}
              alt=""
              className="rounded cursor-pointer"
            />
          </span>
        </div>
        {/* Navigation Links */}
        <nav className="flex justify-start py-0">
          {/* Avatar Menu Trigger */}
          <IconButton onClick={handleMenuOpen} sx={{ py: 0 }}>
            <Avatar className="wono-blue-dark" alt={user.name} src="/path-to-avatar.jpg" />
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
            <Typography onClick={()=>{
              navigate('/profile'); 
              setAnchorEl(null)
              }} variant="h6" sx={{px:'1rem',py:'0', borderBottom:'0.5px solid gray', backgroundColor:'#0db4ea', color:'white'}}>{user.name}</Typography>
            <MenuItem onClick={() => {
              navigate("/landing");
              setAnchorEl(null)
            }}>
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
              onChange={handleImageChange}
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
