"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  PanelLeftClose,
  Search,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/service/logout";
import {
  dashboardMenus,
  type DashboardRole,
} from "./dashboardMenu";

type DashboardUser = {
  name?: string;
  email?: string;
  role: DashboardRole;
};

function initials(name?: string) {
  return (name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: DashboardUser;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menu = dashboardMenus[user.role];

  const isActive = (href: string) =>
    pathname === href || (href !== menu.home && pathname.startsWith(`${href}/`));

  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out.");
    router.replace("/auth/login");
    router.refresh();
  };

  const navigation = (
    <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
      <p className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? "lg:hidden" : ""}`}>
        Workspace
      </p>
      <div className="space-y-1">
        {menu.main.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-xl px-3 py-3 text-sm font-semibold transition ${collapsed ? "lg:justify-center" : "gap-3"} ${active ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>
              <Icon size={19} className="shrink-0" />
              <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 border-t border-slate-100 pt-5">
        <p className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? "lg:hidden" : ""}`}>Account</p>
        <div className="space-y-1">
          {menu.secondary.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 ${collapsed ? "lg:justify-center" : "gap-3"}`}>
                <Icon size={19} className="shrink-0 text-slate-400" />
                <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-20" : "lg:w-72"} lg:translate-x-0`}>
        <div className={`flex h-[73px] items-center border-b border-slate-100 px-5 ${collapsed ? "lg:justify-center" : "justify-between"}`}>
          <Link href={menu.home} className="flex items-center gap-3 overflow-hidden">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white"><Wrench size={20} /></span>
            <span className={`whitespace-nowrap text-lg font-extrabold tracking-tight ${collapsed ? "lg:hidden" : ""}`}>FixIt<span className="text-blue-600">Now</span></span>
          </Link>
          <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"><X size={20} /></button>
        </div>
        {navigation}
        <div className={`border-t border-slate-100 p-3 ${collapsed ? "lg:flex lg:justify-center" : ""}`}>
          <button onClick={handleLogout} title="Log out" className={`flex w-full items-center rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 ${collapsed ? "lg:w-auto lg:justify-center" : "gap-3"}`}>
            <LogOut size={19} /><span className={collapsed ? "lg:hidden" : ""}>Log out</span>
          </button>
        </div>
      </aside>
      <div className={`min-h-screen transition-[padding] duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <header className="sticky top-0 z-30 flex h-[73px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"><Menu size={20} /></button>
            <button aria-label="Collapse sidebar" onClick={() => setCollapsed(!collapsed)} className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:block"><PanelLeftClose size={19} className={collapsed ? "rotate-180" : ""} /></button>
            <div><p className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 sm:block">{menu.title}</p><h1 className="text-base font-bold tracking-tight sm:text-lg">Dashboard</h1></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Search" className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 md:block"><Search size={20} /></button>
            <button aria-label="Notifications" className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={20} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" /></button>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-slate-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">{initials(user.name)}</span>
                <span className="hidden max-w-28 sm:block"><span className="block truncate text-sm font-bold">{user.name || "Account"}</span><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">{user.role}</span></span><ChevronDown size={16} className="hidden text-slate-400 sm:block" />
              </button>
              {profileOpen && <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><p className="px-3 py-2 text-xs text-slate-500">{user.email || "Signed in"}</p><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"><LogOut size={17} />Log out</button></div>}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
