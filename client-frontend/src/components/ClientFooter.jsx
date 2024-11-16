import React from "react";
import WonoLogo from '../assets/BIZNest/biznest_logo.jpg'

const ClientFooter = () => {
  return (
    <footer className="bg-black text-white py-6 ">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Logo */}
        {/* <div className="text-3xl font-bold flex">
          <span>Powered by W<span className="wono-blue-text">o</span>N<span className="wono-blue-text">o</span></span> 
        </div>   */}

         <p className="text-sm text-gray-400 text-center">
          © Copyright 2024-25 by WONOCO PRIVATE-LIMITED - SINGAPORE . All rights reserved.
        </p>    
      </div>
    </footer>
  );
};

export default ClientFooter;
