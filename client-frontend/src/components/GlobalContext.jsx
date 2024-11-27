import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const GlobalContext = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  console.log(isSidebarOpen)
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
