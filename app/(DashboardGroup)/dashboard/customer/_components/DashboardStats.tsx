import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

type DashboardStatsProps = {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  pendingPaymentTotal: number;
  loading: boolean;
};

export default function DashboardStats({
  totalBookings,
  upcomingBookings,
  completedBookings,
  pendingPaymentTotal,
  loading,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings.toString(),
      description: "All your service requests",
      icon: CalendarDays,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Request Bookings",
      value: upcomingBookings.toString(),
      description: "Services scheduled ahead",
      icon: Clock3,
      iconStyle: "bg-violet-50 text-violet-600",
    },
    {
      title: "Completed",
      value: completedBookings.toString(),
      description: "Successfully completed",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Payments",
      value: `৳${pendingPaymentTotal.toLocaleString("en-US")}`,
      description: "Awaiting payment",
      icon: CreditCard,
      iconStyle: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-slate-900">
          Your Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          A quick look at your service activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                    {loading ? "—" : stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconStyle}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}