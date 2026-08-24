import { adminGetBookings, adminGetUser } from "@/service/adminGetServices";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  DollarSign,
  MoreHorizontal,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    description: "vs. last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Technicians",
    value: "486",
    change: "+8.2%",
    description: "vs. last month",
    icon: Wrench,
    trend: "up",
  },
  {
    title: "Active Bookings",
    value: "184",
    change: "+14.8%",
    description: "vs. last month",
    icon: CalendarCheck,
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "৳8.42L",
    change: "+18.4%",
    description: "vs. last month",
    icon: DollarSign,
    trend: "up",
  },
];

const bookingStatus = [
  {
    label: "Requested",
    value: 42,
    percentage: 23,
    className: "bg-amber-400",
  },
  {
    label: "Accepted",
    value: 36,
    percentage: 20,
    className: "bg-blue-500",
  },
  {
    label: "In Progress",
    value: 28,
    percentage: 15,
    className: "bg-emerald-500",
  },
  {
    label: "Completed",
    value: 61,
    percentage: 33,
    className: "bg-slate-700",
  },
  {
    label: "Cancelled",
    value: 17,
    percentage: 9,
    className: "bg-red-500",
  },
];


const chartData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 64 },
  { month: "Jun", value: 86 },
  { month: "Jul", value: 78 },
  { month: "Aug", value: 94 },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Technician" | "Admin";
  image?: string;
  createdAt?: string;
}
interface Booking {
  id: string;
  bookingDate: string;
  customerId: string;
  customerNote: string;
  paymentStatus: string;
  serviceId: string;
  status: string;
  technicianId: string;
  totalPrice: number;
}

export default async function AdminDashboardPage() {
  const allusers = await adminGetUser();
  const allBookings = await adminGetBookings();

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Overview
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Good evening, Admin
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Here&apos;s what&apos;s happening across your FixItNow platform
            today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={16} />

          <span>Updated just now</span>
        </div>
      </section>

      {/* ================================= */}
      {/* STAT CARDS */}
      {/* ================================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                  <Icon size={21} />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>
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

      {/* ================================= */}
      {/* REVENUE + BOOKING STATUS */}
      {/* ================================= */}

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Revenue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Revenue overview
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-950">৳8,42,500</h2>

                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <ArrowUpRight size={13} />
                  18.4%
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Revenue generated over the last 8 months
              </p>
            </div>

            <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
              Last 8 months
            </button>
          </div>

          {/* Chart */}
          <div className="mt-8">
            <div className="flex h-64 items-end gap-3 sm:gap-5">
              {chartData.map((item) => (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  <div className="relative flex flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-slate-900 transition-all duration-300 group-hover:bg-blue-600"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-slate-950 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                      ৳{item.value}k
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
                    {item.month}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div>
            <p className="text-sm font-medium text-slate-500">Booking status</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">184</h2>

            <p className="mt-1 text-xs text-slate-400">
              Current active bookings
            </p>
          </div>

          {/* Progress */}
          <div className="mt-7 flex h-3 overflow-hidden rounded-full bg-slate-100">
            {bookingStatus.map((item) => (
              <div
                key={item.label}
                className={item.className}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-7 space-y-4">
            {bookingStatus.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${item.className}`}
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

      {/* ================================= */}
      {/* RECENT BOOKINGS + USERS */}
      {/* ================================= */}

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Recent bookings */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h2 className="font-bold text-slate-950">Recent bookings</h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest activity on the platform
              </p>
            </div>

            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Booking
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Service
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Technician
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Amount
                  </th>

                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {allBookings.data.data?.slice(0, 5).map((booking: Booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-50 transition hover:bg-slate-50/70"
                  >
                    {/* Booking */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          #{booking.id.slice(0, 8)}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {new Date(booking.bookingDate).toLocaleDateString(
                            "en-BD",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </td>

                    {/* Service ID */}
                    <td className="px-6 py-4">
                      <p className="max-w-[150px] truncate text-sm font-medium text-slate-600">
                        {booking.serviceId}
                      </p>
                    </td>

                    {/* Technician ID */}
                    <td className="px-6 py-4">
                      <p className="max-w-[150px] truncate text-sm text-slate-500">
                        {booking.technicianId}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      ৳{booking.totalPrice.toLocaleString("en-BD")}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent users */}
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h2 className="font-bold text-slate-950">New users</h2>

              <p className="mt-1 text-xs text-slate-400">
                Recently registered accounts
              </p>
            </div>

            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {allusers.data.data?.slice(0, 5).map((user: User) => {
              const initials = user.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-4 transition hover:bg-slate-50"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  {/* User information */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  {/* Role + joined date */}
                  <div className="text-right">
                    <p
                      className={`
            text-[10px] font-bold uppercase
            ${
              user.role === "Technician"
                ? "text-blue-600"
                : user.role === "Admin"
                  ? "text-purple-600"
                  : "text-slate-500"
            }
          `}
                    >
                      {user.role}
                    </p>

                    {user.createdAt && (
                      <p className="mt-1 text-[10px] text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================= */
/* STATUS BADGE */
/* ================================= */

function StatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    {
      label: string;
      className: string;
      icon: React.ReactNode;
    }
  > = {
    PAID: {
      label: "Paid",
      className: "bg-violet-50 text-violet-700",
      icon: <CheckCircle2 size={12} />,
    },

    REQUESTED: {
      label: "Requested",
      className: "bg-amber-50 text-amber-700",
      icon: <Clock3 size={12} />,
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
  };

  const item = config[status] ?? {
    label: status,
    className: "bg-slate-100 text-slate-600",
    icon: null,
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1
        text-[10px] font-bold
        ${item.className}
      `}
    >
      {item.icon}
      {item.label}
    </span>
  );
}
