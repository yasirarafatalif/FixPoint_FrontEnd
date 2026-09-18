import { adminGetBookings, adminGetUser } from "@/service/adminGetServices";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  DollarSign,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";

type ApiUser = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  avatar?: string;
  createdAt?: string;
};
type ApiBooking = {
  id: string;
  bookingDate?: string;
  createdAt?: string;
  serviceId?: string;
  technicianId?: string;
  service?: { title?: string };
  technician?: { name?: string };
  status?: string;
  paymentStatus?: string;
  totalPrice?: number | string;
  price?: number | string;
};
type StatusItem = {
  label: string;
  value: number;
  percentage: number;
  className: string;
};
const statusDefinitions = [
  { key: "REQUESTED", label: "Requested", className: "bg-amber-400" },
  { key: "ACCEPTED", label: "Accepted", className: "bg-blue-500" },
  { key: "PAID", label: "Paid", className: "bg-violet-500" },
  { key: "IN_PROGRESS", label: "In Progress", className: "bg-emerald-500" },
  { key: "COMPLETED", label: "Completed", className: "bg-slate-700" },
  { key: "CANCELLED", label: "Cancelled", className: "bg-red-500" },
  { key: "DECLINED", label: "Declined", className: "bg-rose-400" },
] as const;
const finalStatuses = new Set(["COMPLETED", "CANCELLED", "DECLINED"]);

function extractList<T>(response: unknown): T[] {
  if (!response || typeof response !== "object") return [];
  const root = response as { data?: unknown };
  if (Array.isArray(root.data)) return root.data as T[];
  if (root.data && typeof root.data === "object") {
    const nested = root.data as {
      data?: unknown;
      users?: unknown;
      bookings?: unknown;
    };
    for (const value of [nested.data, nested.users, nested.bookings])
      if (Array.isArray(value)) return value as T[];
  }
  return [];
}
function normaliseStatus(status?: string) {
  return (
    status
      ?.trim()
      .toUpperCase()
      .replace(/[-\s]+/g, "_") ?? "UNKNOWN"
  );
}
function bookingAmount(booking: ApiBooking) {
  const value = Number(booking.totalPrice ?? booking.price ?? 0);
  return Number.isFinite(value) ? value : 0;
}
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}
function formatDate(date?: string) {
  if (!date || Number.isNaN(new Date(date).getTime()))
    return "Date unavailable";
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
function getLastEightMonths(bookings: ApiBooking[]) {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const months = Array.from({ length: 8 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (7 - index));
    return {
      month: formatter.format(date),
      key: date.getFullYear() + "-" + date.getMonth(),
      value: 0,
    };
  });
  bookings.forEach((booking) => {
    const date = new Date(booking.bookingDate ?? booking.createdAt ?? "");
    const isRevenue =
      normaliseStatus(booking.status) === "COMPLETED" ||
      normaliseStatus(booking.paymentStatus) === "PAID";
    if (Number.isNaN(date.getTime()) || !isRevenue) return;
    const month = months.find(
      (item) => item.key === date.getFullYear() + "-" + date.getMonth(),
    );
    if (month) month.value += bookingAmount(booking);
  });
  return months;
}

export default async function AdminDashboardPage() {
  const [usersResponse, bookingsResponse] = await Promise.all([
    adminGetUser(),
    adminGetBookings(),
  ]);
  const users = usersResponse.success
    ? extractList<ApiUser>(usersResponse.data)
    : [];
  const bookings = bookingsResponse.success
    ? extractList<ApiBooking>(bookingsResponse.data)
    : [];
  const technicianCount = users.filter(
    (user) => user.role?.toUpperCase() === "TECHNICIAN",
  ).length;
  const activeBookingCount = bookings.filter(
    (booking) => !finalStatuses.has(normaliseStatus(booking.status)),
  ).length;
  const completedRevenue = bookings.reduce((total, booking) => {
    const isRevenue =
      normaliseStatus(booking.status) === "COMPLETED" ||
      normaliseStatus(booking.paymentStatus) === "PAID";
    return total + (isRevenue ? bookingAmount(booking) : 0);
  }, 0);
  const chartData = getLastEightMonths(bookings);
  const chartMaximum = Math.max(...chartData.map((item) => item.value), 1);
  const bookingStatus: StatusItem[] = statusDefinitions.map((definition) => {
    const value = bookings.filter(
      (booking) => normaliseStatus(booking.status) === definition.key,
    ).length;
    return {
      ...definition,
      value,
      percentage: bookings.length
        ? Math.round((value / bookings.length) * 100)
        : 0,
    };
  });
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? b.bookingDate ?? 0).getTime() -
        new Date(a.createdAt ?? a.bookingDate ?? 0).getTime(),
    )
    .slice(0, 5);
  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5);
  const stats = [
    {
      title: "Total users",
      value: users.length.toLocaleString("en-BD"),
      description: "Registered accounts",
      icon: Users,
    },
    {
      title: "Technicians",
      value: technicianCount.toLocaleString("en-BD"),
      description: "Registered technicians",
      icon: Wrench,
    },
    {
      title: "Active bookings",
      value: activeBookingCount.toLocaleString("en-BD"),
      description: "Not completed or cancelled",
      icon: CalendarCheck,
    },
    {
      title: "Collected revenue",
      value: formatCurrency(completedRevenue),
      description: "Paid or completed bookings",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Overview
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Admin dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Live platform activity from your registered users and bookings.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={16} />
          <span>Updated just now</span>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon size={21} />
              </div>
              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                  {stat.value}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">Revenue overview</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {formatCurrency(completedRevenue)}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Paid or completed booking revenue over the last 8 months
          </p>
          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {chartData.map((item) => (
              <div
                key={item.key}
                className="group flex h-full flex-1 flex-col justify-end"
              >
                <div className="relative flex flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-slate-900 transition group-hover:bg-blue-600"
                    style={{
                      height: item.value
                        ? String(
                            Math.max((item.value / chartMaximum) * 100, 4),
                          ) + "%"
                        : "0%",
                    }}
                  />
                  <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                    {formatCurrency(item.value)}
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
                  {item.month}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">Booking status</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {bookings.length.toLocaleString("en-BD")}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            All bookings on the platform
          </p>
          <div className="mt-7 flex h-3 overflow-hidden rounded-full bg-slate-100">
            {bookingStatus.map((item) => (
              <div
                key={item.label}
                className={item.className}
                style={{ width: String(item.percentage) + "%" }}
              />
            ))}
          </div>
          <div className="mt-7 space-y-4">
            {bookingStatus.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={"h-2.5 w-2.5 rounded-full " + item.className}
                  />
                  <span className="text-sm font-medium text-slate-600">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">
                    {item.value}
                  </span>
                  <span className="w-8 text-right text-xs text-slate-400">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <h2 className="font-bold text-slate-950">Recent bookings</h2>
            <p className="mt-1 text-xs text-slate-400">
              Latest activity on the platform
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {["Booking", "Service", "Technician", "Amount", "Status"].map(
                    (label) => (
                      <th
                        key={label}
                        className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400"
                      >
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentBookings.length ? (
                  recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-50 transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          #{booking.id.slice(0, 8)}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatDate(booking.bookingDate ?? booking.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {booking.service?.title ??
                          booking.serviceId ??
                          "Unavailable"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {booking.technician?.name ??
                          booking.technicianId ??
                          "Unassigned"}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {formatCurrency(bookingAmount(booking))}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyTableRow />
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <h2 className="font-bold text-slate-950">New users</h2>
            <p className="mt-1 text-xs text-slate-400">
              Recently registered accounts
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {recentUsers.length ? (
              recentUsers.map((user) => <UserRow key={user.id} user={user} />)
            ) : (
              <p className="p-6 text-sm text-slate-400">No users found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
function EmptyTableRow() {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
        No bookings found.
      </td>
    </tr>
  );
}
function UserRow({ user }: { user: ApiUser }) {
  const initials = (user.name ?? "User")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const role = user.role?.toUpperCase() ?? "USER";
  const roleClass =
    role === "TECHNICIAN"
      ? "text-blue-600"
      : role === "ADMIN"
        ? "text-purple-600"
        : "text-slate-500";
  return (
    <div className="flex items-center gap-3 p-4 transition hover:bg-slate-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xs font-bold text-slate-700">
        {(user.image ?? user.avatar) ? (
          <img
            src={user.image ?? user.avatar}
            alt={user.name ?? "User"}
            className="h-full w-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-900">
          {user.name ?? "Unnamed user"}
        </p>
        <p className="truncate text-xs text-slate-400">
          {user.email ?? "No email"}
        </p>
      </div>
      <div className="text-right">
        <p className={"text-[10px] font-bold uppercase " + roleClass}>{role}</p>
        {user.createdAt && (
          <p className="mt-1 text-[10px] text-slate-400">
            {formatDate(user.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
}
function StatusBadge({ status }: { status?: string }) {
  const config: Record<
    string,
    { label: string; className: string; icon: ReactNode }
  > = {
    REQUESTED: {
      label: "Requested",
      className: "bg-amber-50 text-amber-700",
      icon: <Clock3 size={12} />,
    },
    ACCEPTED: {
      label: "Accepted",
      className: "bg-blue-50 text-blue-700",
      icon: <CheckCircle2 size={12} />,
    },
    PAID: {
      label: "Paid",
      className: "bg-violet-50 text-violet-700",
      icon: <CheckCircle2 size={12} />,
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-emerald-50 text-emerald-700",
      icon: <Wrench size={12} />,
    },
    COMPLETED: {
      label: "Completed",
      className: "bg-slate-100 text-slate-700",
      icon: <CheckCircle2 size={12} />,
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700",
      icon: <XCircle size={12} />,
    },
    DECLINED: {
      label: "Declined",
      className: "bg-red-50 text-red-700",
      icon: <XCircle size={12} />,
    },
  };
  const item = config[normaliseStatus(status)] ?? {
    label: status ?? "Unknown",
    className: "bg-slate-100 text-slate-600",
    icon: null,
  };
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold " +
        item.className
      }
    >
      {item.icon}
      {item.label}
    </span>
  );
}
