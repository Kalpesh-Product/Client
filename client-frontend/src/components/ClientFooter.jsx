import React from "react";
import WonoLogo from '../assets/BIZNest/biznest_logo.jpg'

const ClientFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex">
          <span>Powered by WoNo</span> 
        </div>      
      </div>
    </footer>
  );
};

export default ClientFooter;
