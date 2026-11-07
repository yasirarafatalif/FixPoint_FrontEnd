
import Link from "next/link";
import {
  getAdminUsers,
  getAdminBookings,
} from "@/service/adminDashboardService";

export const dynamic = "force-dynamic";

type AdminUser = {
  id: string | number;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

type Booking = {
  id: string | number;
  status?: string | null;
  serviceName?: string | null;
  service?: {
    name?: string | null;
  } | null;
};

export default async function AdminDashboardPage() {
  let users: AdminUser[] = [];
  let bookings: Booking[] = [];
  let error = "";

  try {
    const [userResult, bookingResult] = await Promise.all([
      getAdminUsers(),
      getAdminBookings(),
    ]);

    users = Array.isArray(userResult.data)
      ? userResult.data
      : [];

    bookings = Array.isArray(bookingResult.data)
      ? bookingResult.data
      : [];
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to load dashboard data";
  }

  const countStatus = (status: string) =>
    bookings.filter(
      (booking) =>
        booking.status?.toUpperCase() === status
    ).length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      color: "bg-blue-50 text-blue-700",
      icon: "👥",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      color: "bg-violet-50 text-violet-700",
      icon: "📅",
    },
    {
      title: "Completed",
      value: countStatus("COMPLETED"),
      color: "bg-green-50 text-green-700",
      icon: "✅",
    },
    {
      title: "Pending",
      value: countStatus("REQUESTED"),
      color: "bg-amber-50 text-amber-700",
      icon: "⏳",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl bg-gradient-to-r from-slate-950 to-blue-900 p-6 text-white md:p-10">
          <p className="text-sm text-blue-200">
            FixItNow / Administration
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-slate-300">
            Manage users, monitor bookings, and track
            your service marketplace.
          </p>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <span className="text-2xl">{stat.icon}</span>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${stat.color}`}
              >
                Live API data
              </span>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  User Management
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View registered marketplace users.
                </p>
              </div>

              <Link
                href="/dashboard/admin/users"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                View Users
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {user.name || "Unnamed User"}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {user.email || "No email"}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {user.role || "USER"}
                  </span>
                </div>
              ))}

              {users.length === 0 && !error && (
                <p className="py-6 text-center text-slate-500">
                  No users found.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Bookings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Monitor recent service requests.
                </p>
              </div>

              <Link
                href="/dashboard/admin/bookings"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                View All
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {booking.service?.name ||
                        booking.serviceName ||
                        "Service Booking"}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      ID: {booking.id}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {booking.status || "UNKNOWN"}
                  </span>
                </div>
              ))}

              {bookings.length === 0 && !error && (
                <p className="py-6 text-center text-slate-500">
                  No bookings found.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
