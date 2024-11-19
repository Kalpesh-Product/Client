import React, { useState } from "react";

export const NewModal = ({ open, onClose, children }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 ">
        <div className="bg-white motion-preset-expand motion-duration-200 w-full max-w-lg p-6 rounded-lg relative">
          {children}
        </div>
      </div>
    );
  };