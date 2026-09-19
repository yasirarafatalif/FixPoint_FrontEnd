import {
  Users,
  UserRound,
  Wrench,
  CheckCircle2,
} from "lucide-react";

import type { User } from "../UsersClient";

interface UserStatsProps {
  users: User[];
}

export default function UserStats({
  users,
}: UserStatsProps) {
  const totalUsers = users.length;

  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

  const technicians = users.filter(
    (user) => user.role === "TECHNICIAN"
  ).length;

  const activeUsers = users.filter(
    (user) => user.status === "ACTIVE"
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value={totalUsers}
        description="Registered accounts"
        icon={<Users size={20} />}
      />

      <StatCard
        title="Customers"
        value={customers}
        description="Service customers"
        icon={<UserRound size={20} />}
      />

      <StatCard
        title="Technicians"
        value={technicians}
        description="Service providers"
        icon={<Wrench size={20} />}
      />

      <StatCard
        title="Active Users"
        value={activeUsers}
        description="Currently active"
        icon={<CheckCircle2 size={20} />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="mt-4">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          {value}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}