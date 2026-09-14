
import {
  BriefcaseBusiness,
  CalendarCheck,
  CircleDollarSign,
  Clock3,
  TrendingUp,
  Wrench,
} from "lucide-react";

const stats = [
  {
    title: "Total Earnings",
    value: "৳24,500",
    description: "+12% from last month",
    icon: CircleDollarSign,
  },
  {
    title: "Total Bookings",
    value: "48",
    description: "All time bookings",
    icon: CalendarCheck,
  },
  {
    title: "Pending Requests",
    value: "6",
    description: "Need your response",
    icon: Clock3,
  },
  {
    title: "Active Jobs",
    value: "3",
    description: "Currently in progress",
    icon: Wrench,
  },
];

const recentBookings = [
  {
    id: "BK-1024",
    customer: "Rahim Ahmed",
    service: "Electrical Repair",
    date: "14 Sep, 2026",
    time: "10:00 AM",
    status: "REQUESTED",
    price: 1200,
  },
  {
    id: "BK-1023",
    customer: "Karim Hasan",
    service: "Plumbing Service",
    date: "13 Sep, 2026",
    time: "02:00 PM",
    status: "ACCEPTED",
    price: 800,
  },
  {
    id: "BK-1022",
    customer: "Sakib Khan",
    service: "AC Repair",
    date: "12 Sep, 2026",
    time: "11:00 AM",
    status: "IN_PROGRESS",
    price: 2500,
  },
];

const statusStyles: Record<string, string> = {
  REQUESTED: "bg-amber-50 text-amber-600 ring-amber-100",
  ACCEPTED: "bg-blue-50 text-blue-600 ring-blue-100",
  IN_PROGRESS: "bg-purple-50 text-purple-600 ring-purple-100",
  COMPLETED: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  DECLINED: "bg-rose-50 text-rose-600 ring-rose-100",
};

export default function TechnicianDashboardPage() {
  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Technician Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your bookings, services and availability from one place.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Your business is growing
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>

              </div>

              <p className="mt-4 text-xs font-medium text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}

      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid gap-8 xl:grid-cols-[1fr_350px]">

        {/* ================= RECENT BOOKINGS ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 p-6">

            <div>
              <h2 className="text-lg font-black text-slate-900">
                Recent Booking Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest requests from your customers.
              </p>
            </div>

            <a
              href="/dashboard/technician/bookings"
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              View All →
            </a>

          </div>

          <div className="divide-y divide-slate-100">

            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {booking.service}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {booking.customer} • {booking.date} • {booking.time}
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                      statusStyles[booking.status]
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>

                  <p className="font-black text-slate-900">
                    ৳{booking.price}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-black text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your work faster.
          </p>

          <div className="mt-6 space-y-3">

            <a
              href="/dashboard/technician/bookings"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <CalendarCheck className="h-5 w-5 text-blue-600" />

              <div>
                <p className="font-bold text-slate-900">
                  Manage Bookings
                </p>

                <p className="text-xs text-slate-500">
                  Accept or decline requests
                </p>
              </div>
            </a>

            <a
              href="/dashboard/technician/profile"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />

              <div>
                <p className="font-bold text-slate-900">
                  Edit Profile
                </p>

                <p className="text-xs text-slate-500">
                  Update your professional information
                </p>
              </div>
            </a>

            <a
              href="/dashboard/technician/availability"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <Clock3 className="h-5 w-5 text-blue-600" />

              <div>
                <p className="font-bold text-slate-900">
                  Set Availability
                </p>

                <p className="text-xs text-slate-500">
                  Manage your working schedule
                </p>
              </div>
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

