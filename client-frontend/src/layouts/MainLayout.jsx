import { Outlet, useLocation } from "react-router-dom";
import ClientHeader from "../components/ClientHeader";
import ClientFooter from "../components/ClientFooter";

export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/";
  const hideHeader = location.pathname === "/";
  return (
    <div>
      {!hideHeader && <ClientHeader />}

      <div className="min-h-screen overflow-y-auto">
        <Outlet />
      </div>

      {!hideFooter && <ClientFooter />}
    </div>
  );
}
