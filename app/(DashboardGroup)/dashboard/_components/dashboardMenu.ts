import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
  UserRound,
  type LucideIcon,
  CalendarClock,
  CreditCard,
  Star,
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
      {
        label: "Overview",
        href: "/dashboard/customer",
        icon: LayoutDashboard,
      },
      {
        label: "My Bookings",
        href: "/dashboard/customer/bookings",
        icon: CalendarDays,
      },
      {
        label: "Payments",
        href: "/dashboard/customer/payments",
        icon: CreditCard,
      },
      {
        label: "My Reviews",
        href: "/dashboard/customer/reviews",
        icon: Star,
      },
    ],

    secondary: [
      {
        label: "My Profile",
        href: "/dashboard/customer/profile",
        icon: UserRound,
      },
    ],
  },
  TECHNICIAN: {
    title: "Technician workspace",
    home: "/dashboard/technician",
    main: [
      {
        label: "Overview",
        href: "/dashboard/technician",
        icon: LayoutDashboard,
      },
      {
        label: "Bookings",
        href: "/dashboard/technician/bookings",
        icon: CalendarDays,
      },
      {
        label: "Availability",
        href: "/dashboard/technician/availability",
        icon: CalendarClock,
      },
      // { label: "My profile", href: "/dashboard/technician/profile", icon: UserRound }
    ],
    secondary: [
      {
        label: "My profile",
        href: "/dashboard/technician/profile",
        icon: UserRound,
      },
    ],
  },
  ADMIN: {
    title: "Administration",
    home: "/dashboard/admin",
    main: [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Categories", href: "/dashboard/admin/categories", icon: Tags },
      {
        label: "Bookings",
        href: "/dashboard/admin/bookings",
        icon: CalendarDays,
      },
    ],
    secondary: [
      {
        label: "Platform settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
      },
    ],
  },
};

export const fallbackDashboardRole: DashboardRole = "CUSTOMER";
