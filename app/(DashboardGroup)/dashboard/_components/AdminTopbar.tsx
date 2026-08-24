"use client";

import {
  Menu,
  ShieldCheck,
} from "lucide-react";

interface AdminTopbarProps {
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function AdminTopbar({
  setMobileOpen,
}: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* ================= LEFT ================= */}

      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() =>
            setMobileOpen(true)
          }
          className="
            flex h-10 w-10 items-center
            justify-center rounded-xl
            border border-slate-200
            text-slate-600
            transition hover:bg-slate-50
            lg:hidden
          "
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="hidden items-center gap-2 sm:flex">
            <ShieldCheck
              size={14}
              className="text-blue-600"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              FixItNow Administration
            </p>
          </div>

          <h2 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">
            Admin Dashboard
          </h2>
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            System Active
          </span>
        </div>

        {/* Admin Avatar */}
        <button
          type="button"
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-full bg-slate-950
            text-xs font-bold text-white
            ring-4 ring-slate-100
            transition hover:ring-blue-100
          "
        >
          Admin
        </button>
      </div>
    </header>
  );
}