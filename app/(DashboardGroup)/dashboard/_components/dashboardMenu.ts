
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
  Tags,
  Users,
  Wrench,
  UserRound,
  Clock3,
  type LucideIcon,
} from "lucide-react";

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardMenu {
  main: MenuItem[];
  bottom: MenuItem[];
}

export const dashboardMenus: Record<UserRole, DashboardMenu> = {
  CUSTOMER: {
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
        label: "Payment History",
        href: "/dashboard/customer/payments",
        icon: CreditCard,
      },
    ],

    bottom: [
      {
        label: "Settings",
        href: "/dashboard/customer/settings",
        icon: Settings,
      },
    ],
  },

  TECHNICIAN: {
    main: [
      {
        label: "Overview",
        href: "/dashboard/technician",
        icon: LayoutDashboard,
      },
      {
        label: "My Bookings",
        href: "/dashboard/technician/bookings",
        icon: CalendarDays,
      },
      {
        label: "My Services",
        href: "/dashboard/technician/services",
        icon: Wrench,
      },
      {
        label: "Availability",
        href: "/dashboard/technician/availability",
        icon: Clock3,
      },
    ],

    bottom: [
      {
        label: "My Profile",
        href: "/dashboard/technician/profile",
        icon: UserRound,
      },
      {
        label: "Settings",
        href: "/dashboard/technician/settings",
        icon: Settings,
      },
    ],
  },

  ADMIN: {
    main: [
      {
        label: "Overview",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        label: "Categories",
        href: "/dashboard/admin/categories",
        icon: Tags,
      },
      {
        label: "Bookings",
        href: "/dashboard/admin/bookings",
        icon: CalendarDays,
      },
    ],

    bottom: [
      {
        label: "Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
      },
    ],
  },
};

