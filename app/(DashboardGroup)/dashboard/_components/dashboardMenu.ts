import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type DashboardMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type DashboardMenu = {
  title: string;
  home: string;
  main: DashboardMenuItem[];
  secondary: DashboardMenuItem[];
};

export const dashboardMenus: Record<DashboardRole, DashboardMenu> = {
  CUSTOMER: {
    title: "Customer workspace",
    home: "/dashboard/customer",
    main: [
      { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    ],
    secondary: [
      { label: "My profile", href: "/dashboard/customer/profile", icon: UserRound },
    ],
  },
  TECHNICIAN: {
    title: "Technician workspace",
    home: "/dashboard/technician",
    main: [
      { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
      { label: "Bookings", href: "/dashboard/technician/bookings", icon: CalendarDays },
      { label: "Availability", href: "/dashboard/technician/availability", icon: CalendarDays },
    ],
    secondary: [
      { label: "My profile", href: "/dashboard/technician/profile", icon: UserRound },
    ],
  },
  ADMIN: {
    title: "Administration",
    home: "/dashboard/admin-dashboard",
    main: [
      { label: "Overview", href: "/dashboard/admin-dashboard", icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/admin-dashboard/users", icon: Users },
      { label: "Categories", href: "/dashboard/admin-dashboard/categories", icon: Tags },
    ],
    secondary: [
      { label: "Platform settings", href: "/dashboard/admin-dashboard", icon: Settings },
    ],
  },
};

export const fallbackDashboardRole: DashboardRole = "CUSTOMER";
