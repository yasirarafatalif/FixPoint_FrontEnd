import { redirect } from "next/navigation";
import { getMe } from "@/service/getme";

export default async function DashboardPage() {
  const response = await getMe();
  // console.log(response)
  const payload = response.success ? (response.data as { role?: string; data?: { role?: string } }) : null;
  const role = (payload?.data?.role ?? payload?.role)?.toUpperCase();

  if (role === "ADMIN") redirect("/dashboard/admin");
  if (role === "TECHNICIAN") redirect("/dashboard/technician");
  redirect("/dashboard/customer");
}
