import { Link, Outlet, useLocation } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";
import MainSideBar from "../components/Sidebar/MainSideBar";
import { Breadcrumbs, Typography } from "@mui/material";
import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronLeft } from "react-icons/fa6";

export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/auth";
  const hideHeader = location.pathname === "/auth";
  const pathnames = location.pathname.split("/").filter((x) => x); // Remove empty segments
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  console.log("sidebar is : ", isSidebarOpen);

  return (
    <div className="">
      {!hideHeader && <ClientHeader />}

      <div className="h-[90vh] overflow-y-hidden flex bg-gray-100">
        {location.pathname !== "/" &&  (
          <MainSideBar/>
        ) }

        <div className="w-full h-[88vh] p-2 overflow-y-auto">
          <div className="bg-white">
            {location.pathname !== "/" && (
              <div className="px-4 pt-4 pb-2 flex gap-4 justify-start w-full border-b-2 border-gray-100">
                <button className="rounded-full p-1 hover:bg-gray-200 hover:cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  {isSidebarOpen ? <FaChevronLeft /> : <GiHamburgerMenu />}
                </button>
                <Breadcrumbs separator=">" aria-label="breadcrumb">
                  <Link underline="hover" to="/">
                    Home
                  </Link>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    return last ? (
                      <Typography color="text.primary" key={to}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
                        {/* Capitalize */}
                      </Typography>
                    ) : (
                      <Link underline="hover" color="inherit" to={to} key={to}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>

      {!hideFooter && <ClientFooter />}
    </div>
  );
}
