import { getMe } from "@/service/getme";
import DashboardShell from "./_components/DashboardShell";
import {
  fallbackDashboardRole,
  type DashboardRole,
} from "./_components/dashboardMenu";

type ApiUser = {
  name?: string;
  email?: string;
  role?: string;
  data?: ApiUser;
};

function getDashboardRole(role?: string): DashboardRole {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "ADMIN";
    case "TECHNICIAN":
      return "TECHNICIAN";
    case "CUSTOMER":
    case "USER":
      return "CUSTOMER";
    default:
      return fallbackDashboardRole;
  }
}

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const response = await getMe();
  const rawUser = response.success ? (response.data as ApiUser) : undefined;
  const user = rawUser?.data ?? rawUser;

  return (
    <DashboardShell
      user={{
        name: user?.name,
        email: user?.email,
        role: getDashboardRole(user?.role),
      }}
    >
      {children}
    </DashboardShell>
  );
}
