"use client";

import { LogOut } from "lucide-react";

interface AdminProfileProps {
  collapsed: boolean;
}

export default function AdminProfile({
  collapsed,
}: AdminProfileProps) {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          A
        </div>

        <button
          type="button"
          title="Logout"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        A
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-900">
          Admin
        </p>

        <p className="truncate text-xs font-medium text-slate-400">
          Administrator
        </p>
      </div>

      <button
        type="button"
        title="Logout"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-600"
      >
        <LogOut size={17} />
      </button>
    </div>
  );
}