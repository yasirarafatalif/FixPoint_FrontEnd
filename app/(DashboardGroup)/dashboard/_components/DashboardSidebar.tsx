
"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import {
  dashboardMenus,
  type UserRole,
} from "./dashboardMenu";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { user } = useAuth();

 
  if (!user) {
    return null;
  }

  const role = user.role as UserRole;

  const menu = dashboardMenus[role];

  if (!menu) {
    return null;
  }

  return (
    <aside className="hidden min-h-screen w-64 flex-col bg-slate-900 text-slate-300 md:flex">

      {/* ================= Logo ================= */}
      <div className="flex h-16 items-center border-b border-slate-800 bg-slate-950 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <Wrench className="h-5 w-5 text-blue-500" />

          FixItNow
        </Link>
      </div>

      {/* ================= Main Menu ================= */}
      <nav className="flex-1 space-y-2 px-4 py-6">

        {menu.main.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== `/dashboard/${role.toLowerCase()}` &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                isActive
                  ? "bg-blue-600/10 text-blue-400"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* ================= Bottom Menu ================= */}
      <div className="space-y-2 border-t border-slate-800 p-4">

        {menu.bottom.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                isActive
                  ? "bg-blue-600/10 text-blue-400"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}

      </div>

    </aside>
  );
}

