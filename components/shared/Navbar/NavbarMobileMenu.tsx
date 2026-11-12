
"use client";

import Link from "next/link";
import {
  User,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

import NavbarLinks from "./NavbarLinks";
import type { NavbarUser } from "./useNavbarUser";

export default function NavbarMobileMenu({
  open,
  user,
  role,
  dashboardHref,
  profileHref,
  isAuthenticated,
  onLogout,
  onClose,
}: {
  open: boolean;
  user: NavbarUser | null;
  role: string;
  dashboardHref: string;
  profileHref: string;
  isAuthenticated: boolean;
  onLogout: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute left-0 z-50 w-full border-t border-slate-200 bg-white shadow-2xl md:hidden">
      <div className="space-y-1 px-4 pb-6 pt-4">
        <NavbarLinks mobile onNavigate={onClose} />

        <div className="my-4 border-t border-slate-100 pt-4">
          {isAuthenticated ? (
            <div className="space-y-1">
              {/* User Information */}
              <div className="mb-3 flex items-center gap-3 px-4 py-2">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <User size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email || "Signed in"}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase text-blue-600">
                    {role}
                  </p>
                </div>
              </div>

              {/* Dashboard */}
              <Link
                href={dashboardHref}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              {/* Profile Settings */}
              <Link
                href={profileHref}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                <Settings size={20} />
                Profile Settings
              </Link>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={20} />
                Log out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-2">
              <Link
                href="/auth/login"
                onClick={onClose}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-center font-bold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>

              <Link
                href="/auth/register"
                onClick={onClose}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
