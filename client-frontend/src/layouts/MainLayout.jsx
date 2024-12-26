import { Outlet, useLocation } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";
import MainSideBar from "../components/Sidebar/MainSideBar";

export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/auth";
  const hideHeader = location.pathname === "/auth";
  return (
    <div className="">
      {!hideHeader && <ClientHeader />}

      <div className="h-full overflow-y-hidden flex">
        {location.pathname !== "/" ? <MainSideBar /> : null}

        <div className="w-full">
          <Outlet />
        </div>
      </div>

      {!hideFooter && <ClientFooter />}
    </div>
  );
}
