import { Outlet, useLocation } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";


export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/auth";
  const hideHeader = location.pathname === "/auth";
  return (
    <div className="">
      {!hideHeader && <ClientHeader />}

      <div className="h-full overflow-y-hidden">
        <Outlet />
      </div>

      {!hideFooter && <ClientFooter />}
    </div>
  );
}
