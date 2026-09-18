
import { getMe } from "@/service/getme";
import DashboardShell from "./_components/DashboardShell";
import { fallbackDashboardRole, type DashboardRole } from "./_components/dashboardMenu";

type ApiUser = {
  name?: string;
  email?: string;
  role?: string;
  data?: ApiUser;
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getMe();
  const rawUser = response.success ? (response.data as ApiUser) : undefined;
  const user = rawUser?.data ?? rawUser;
  const role = user?.role as DashboardRole | undefined;

  return (
    <DashboardShell
      user={{
        name: user?.name,
        email: user?.email,
        role: role === "ADMIN" || role === "TECHNICIAN" || role === "CUSTOMER" ? role : fallbackDashboardRole,
      }}
    >
      {children}
    </DashboardShell>
  );
}

