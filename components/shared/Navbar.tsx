"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Wrench,
  User,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { getMe } from "@/service/getme";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ email?: string , name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchMe() {
      try {
        const result = await getMe();
        if (result.success) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, []);

  const isAuthenticated = !!user;
  // console.log(user);


  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* =======================
              Left: Brand Logo
          ======================== */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-md group-hover:shadow-blue-500/30 transition-all duration-300">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                FixIt<span className="text-blue-600">Now</span>
              </span>
            </Link>
          </div>

          {/* =======================
              Center: Desktop Links
          ======================== */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/categories"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* =======================
              Right: Auth Buttons / User Profile
          ======================== */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              /* --- User Profile Dropdown --- */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {user?.data?.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 transform opacity-100 scale-100 transition-all origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-sm text-slate-500">Signed in as {user?.data?.role} </p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user?.data?.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/customer"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/customer/settings"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </Link>

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        // Add Logout Logic Here
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* --- Login / Register Buttons --- */
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-3"
                >
                  Log in
                </Link>
                <Link href="/auth/register">
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transform hover:-translate-y-0.5 transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* =======================
              Mobile Menu Toggle Button
          ======================== */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="block w-6 h-6" />
              ) : (
                <Menu className="block w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          Mobile Menu Dropdown
      ======================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-2xl absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link
              href="/"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>

            <div className="border-t border-slate-100 my-4 pt-4">
              {isAuthenticated ? (
                /* --- Mobile Authenticated Menu --- */
                <div className="space-y-1">
                  <div className="px-4 py-2 mb-2 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-500">
                        customer@example.com
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/customer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/customer/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50 text-left mt-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Log out
                  </button>
                </div>
              ) : (
                /* --- Mobile Unauthenticated Menu --- */
                <div className="flex flex-col gap-3 px-2 mt-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full text-center px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
                      Log in
                    </button>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full text-center px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
