
"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { getMe } from "@/service/getme";
import { logout } from "@/service/logout";

import {
  dashboardMenus,
  fallbackDashboardRole,
  type DashboardRole,
} from "@/app/(DashboardGroup)/dashboard/_components/dashboardMenu";

export type NavbarUser = {
  name?: string;
  email?: string;
  role?: string;
};

export function useNavbarUser() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<NavbarUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const result = await getMe();

      if (result.success) {
        const response = result.data;
        setUser(response?.data ?? response ?? null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Dashboard থেকে public page-এ ফিরলে user refresh হবে
    if (pathname.startsWith("/dashboard")) return;

    const timeoutId = window.setTimeout(() => {
      void fetchUser();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, fetchUser]);

  const roleValue = user?.role?.toUpperCase();

  const role: DashboardRole =
    roleValue && roleValue in dashboardMenus
      ? (roleValue as DashboardRole)
      : fallbackDashboardRole;

  const dashboardHref = dashboardMenus[role].home;
  const profileHref = `${dashboardHref}/profile`;

  const handleLogout = async () => {
    try {
      await logout();

      setUser(null);
      toast.success("User logged out successfully!");

      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  };

  return {
    user,
    role,
    loading,
    isAuthenticated: !!user,
    dashboardHref,
    profileHref,
    handleLogout,
    refreshUser: fetchUser,
  };
}
