"use client";

import { useState } from "react";
import AdminSidebar from "../_components/AdminSidebar";
import AdminTopbar from "../_components/AdminTopbar";


interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main */}
      <div
        className={`
          min-h-screen
          transition-all duration-300
          ease-in-out
          ${
            collapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[260px]"
          }
        `}
      >
        {/* Topbar */}
        <AdminTopbar
          setMobileOpen={setMobileOpen}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}