"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Wrench,
} from "lucide-react";

import {
  adminNavItems,
  adminSystemItems,
} from "./AdminNav";

import AdminProfile from "./AdminProfile";

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          border-r border-slate-200 bg-white
          transition-all duration-300 ease-in-out

          ${collapsed ? "w-[76px]" : "w-[260px]"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ================= LOGO ================= */}

        <div
          className={`
            flex h-[72px] items-center
            border-b border-slate-100
            ${
              collapsed
                ? "justify-center px-3"
                : "justify-between px-5"
            }
          `}
        >
          <Link
            href="/dashboard/admin"
            onClick={() =>
              setMobileOpen(false)
            }
            className="flex items-center gap-3 overflow-hidden"
          >
            {/* Collapsed Logo */}
            {collapsed ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
                <Wrench size={20} />
              </div>
            ) : (
              /* Expanded Logo */
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Wrench size={20} />
                </div>

                <div>
                  <h1 className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-950">
                    FixIt
                    <span className="text-blue-600">
                      Now
                    </span>
                  </h1>

                  <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Admin Panel
                  </p>
                </div>
              </div>
            )}
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="flex h-[calc(100vh-72px)] flex-col">
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            {/* Management */}
            {!collapsed && (
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Management
              </p>
            )}

            <div className="space-y-1.5">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(
                  item.href
                );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    title={
                      collapsed
                        ? item.label
                        : undefined
                    }
                    className={`
                      group relative flex
                      items-center rounded-xl
                      py-3 text-sm font-semibold
                      transition-all duration-200

                      ${
                        collapsed
                          ? "justify-center px-3"
                          : "gap-3 px-3"
                      }

                      ${
                        active
                          ? "bg-slate-950 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {active && (
                      <span className="absolute -left-3 h-6 w-1 rounded-r-full bg-blue-600" />
                    )}

                    <Icon
                      size={19}
                      strokeWidth={
                        active ? 2.5 : 2
                      }
                      className={`
                        shrink-0 transition-colors
                        ${
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-700"
                        }
                      `}
                    />

                    {!collapsed && (
                      <span className="whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* System */}
            <div className="mt-8">
              {!collapsed && (
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  System
                </p>
              )}

              <div className="space-y-1.5">
                {adminSystemItems.map(
                  (item) => {
                    const Icon = item.icon;
                    const active = isActive(
                      item.href
                    );

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        title={
                          collapsed
                            ? item.label
                            : undefined
                        }
                        className={`
                          group relative flex
                          items-center rounded-xl
                          py-3 text-sm font-semibold
                          transition-all duration-200

                          ${
                            collapsed
                              ? "justify-center px-3"
                              : "gap-3 px-3"
                          }

                          ${
                            active
                              ? "bg-slate-950 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                          }
                        `}
                      >
                        <Icon
                          size={19}
                          className={
                            active
                              ? "text-white"
                              : "text-slate-400"
                          }
                        />

                        {!collapsed && (
                          <span>
                            {item.label}
                          </span>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </nav>

          {/* ================= PROFILE ================= */}

          <div className="border-t border-slate-100 p-3">
            <AdminProfile
              collapsed={collapsed}
            />
          </div>
        </div>

        {/* ================= COLLAPSE BUTTON ================= */}

        <button
          type="button"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="
            absolute -right-3 top-[84px]
            hidden h-7 w-7 items-center
            justify-center rounded-full
            border border-slate-200
            bg-white text-slate-500
            shadow-sm transition-all
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            lg:flex
          "
        >
          {collapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>
      </aside>
    </>
  );
}