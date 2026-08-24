import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  RotateCcw,
  Image as ImageIcon,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: ShoppingBag,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/categories",
    icon: ImageIcon,
  },
];

export const adminSystemItems: AdminNavItem[] = [
  {
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];