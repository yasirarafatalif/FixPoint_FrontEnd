
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavbarUser } from "./useNavbarUser";

export default function NavbarAuth({
  user,
  role,
  dashboardHref,
  profileHref,
  isAuthenticated,
  onLogout,
}: {
  user: NavbarUser | null;
  role: string;
  dashboardHref: string;
  profileHref: string;
  isAuthenticated: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-4 md:flex">
        <Link
          href="/auth/login"
          className="px-3 text-sm font-bold text-slate-600 hover:text-blue-600"
        >
          Log in
        </Link>

        <Link
          href="/auth/register"
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-3 transition-all hover:bg-slate-100"
      >
        <span className="rounded-full bg-blue-100 p-1.5 text-blue-600">
          <User size={20} />
        </span>

        <span className="text-sm font-semibold text-slate-700">
          {user?.name || "Account"}
        </span>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-60 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
          <div className="mb-1 border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              {role}
            </p>

            <p className="mt-1 truncate text-sm font-bold text-slate-900">
              {user?.name || "User"}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email || "Signed in"}
            </p>
          </div>

          <Link
            href={dashboardHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>

          <Link
            href={profileHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            <Settings size={17} />
            Profile Settings
          </Link>

          <div className="my-1 h-px bg-slate-100" />

          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
