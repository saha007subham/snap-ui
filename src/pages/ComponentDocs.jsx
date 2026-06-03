import { Outlet } from "react-router-dom";
import { SideBar } from "@/components/core-components/SideBar";

export function ComponentDocs() {
  return (
    <div className="flex items-start bg-transparent w-full h-full">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto custom-scrollbar hidden md:block">
        <SideBar />
      </div>
      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar relative">
        <Outlet />
      </main>
    </div>
  );
}
