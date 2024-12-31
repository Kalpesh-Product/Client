import { Link, Outlet, useLocation } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";
import MainSideBar from "../components/Sidebar/MainSideBar";
import { Breadcrumbs, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useSidebar } from "../contexts/SideBarContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronLeft } from "react-icons/fa6";
import { styled } from '@mui/material/styles';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/auth";
  const hideHeader = location.pathname === "/auth";
  const pathnames = location.pathname.split("/").filter((x) => x); // Remove empty segments
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [theme, setTheme] = useState();

  const themes = {
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  };

  console.log("sidebar is : ", isSidebarOpen);

  return (
    <div className="">
      {!hideHeader && <ClientHeader />}

      <div className="h-[90vh] overflow-y-hidden flex bg-[#f5f7fa]">
        {location.pathname !== "/" && <MainSideBar />}

        <div className="w-full h-[88vh] p-2 overflow-y-auto">
          <div className="">
            {location.pathname !== "/" && (
              <div className="px-4 py-2 flex gap-4 justify-start items-center w-full bg-white border-b-2 border-gray-100">
                <button
                  className="rounded-full p-1 hover:bg-gray-200 hover:cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
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
                {/* <div>
                <MaterialUISwitch defaultChecked />
                </div> */}
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
