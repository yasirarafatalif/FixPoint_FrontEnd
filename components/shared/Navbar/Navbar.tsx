
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarAuth from "./NavbarAuth";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useNavbarUser } from "./useNavbarUser";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    user,
    role,
    isAuthenticated,
    dashboardHref,
    profileHref,
    handleLogout,
  } = useNavbarUser();

  const closeMobileMenu = () => setMobileOpen(false);

  const handleMobileLogout = () => {
    closeMobileMenu();
    handleLogout();
  };

  // Hide Navbar inside dashboard
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">

          {/* Brand */}
          <NavbarBrand />

          {/* Desktop Navigation */}
          <NavbarLinks />

          {/* Desktop Authentication */}
          <NavbarAuth
            user={user}
            role={role}
            dashboardHref={dashboardHref}
            profileHref={profileHref}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100"
            >
              {mobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <NavbarMobileMenu
        open={mobileOpen}
        user={user}
        role={role}
        dashboardHref={dashboardHref}
        profileHref={profileHref}
        isAuthenticated={isAuthenticated}
        onLogout={handleMobileLogout}
        onClose={closeMobileMenu}
      />
    </nav>
  );
}
