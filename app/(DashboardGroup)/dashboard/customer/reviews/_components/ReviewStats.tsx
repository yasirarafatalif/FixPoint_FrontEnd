
import {
  Star,
  Clock3,
  ClipboardCheck,
} from "lucide-react";

type ReviewStatsProps = {
  totalBookings: number;
  pendingReviews: number;
  totalReviews: number;
};

export default function ReviewStats({
  totalBookings,
  pendingReviews,
  totalReviews,
}: ReviewStatsProps) {
  const stats = [
    {
      title: "Completed Bookings",
      value: totalBookings,
      label: "Total",
      icon: ClipboardCheck,
      iconStyle: "bg-blue-50 text-blue-700",
      labelStyle: "text-slate-400",
    },
    {
      title: "Pending Reviews",
      value: pendingReviews,
      label: "Action Needed",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
      labelStyle: "text-amber-600",
    },
    {
      title: "Reviews Submitted",
      value: totalReviews,
      label: "Your Feedback",
      icon: Star,
      iconStyle: "bg-emerald-50 text-emerald-600",
      labelStyle: "text-emerald-600",
    },
  ];

  return (
    <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                <Icon size={22} />
              </div>

              <span className={`text-xs font-semibold ${stat.labelStyle}`}>
                {stat.label}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
