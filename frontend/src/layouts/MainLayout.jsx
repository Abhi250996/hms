// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarSwitcher from "./sidebars/SidebarSwitcher";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar Container */}
      <div className="flex-shrink-0">
        <SidebarSwitcher />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;