import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/core-components/SideBar";

export function ComponentDocs() {
  return (
    <div className="flex bg-white items-start">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-slate-200 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto hidden md:block">
        <SideBar />
      </div>
      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
