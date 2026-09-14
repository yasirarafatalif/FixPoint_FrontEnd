
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Dynamic Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Mobile Header */}
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 md:hidden">
          <span className="text-lg font-bold text-slate-900">
            Dashboard
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </div>

      </main>
    </div>
  );
}

