"use client";
import { dashboardMenus, fallbackDashboardRole } from './../../../app/(DashboardGroup)/dashboard/_components/dashboardMenu';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMe } from "@/service/getme";
import { logout } from "@/service/logout";


export type NavbarUser = {
  name?: string;
  email?: string;
  role?: string;
};
import { DashboardRole } from "@/app/(DashboardGroup)/dashboard/_components/dashboardMenu";

export function useNavbarUser() {
  const [user, setUser] = useState<NavbarUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
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
    }

    fetchUser();
  }, []);

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
  };
}
