import Link from "next/link";
import {
  Search,
  CalendarDays,
  Star,
  ArrowRight,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Find a Service",
      description: "Explore available professionals",
      href: "/services",
      icon: Search,
      iconStyle: "bg-blue-100 text-blue-600",
      hoverStyle: "hover:border-blue-200 hover:bg-blue-50",
    },
    {
      title: "My Bookings",
      description: "View requests and status",
      href: "/dashboard/customer/bookings",
      icon: CalendarDays,
      iconStyle: "bg-violet-100 text-violet-600",
      hoverStyle: "hover:border-violet-200 hover:bg-violet-50",
    },
    {
      title: "My Reviews",
      description: "Share your service experience",
      href: "/dashboard/customer/reviews",
      icon: Star,
      iconStyle: "bg-amber-100 text-amber-600",
      hoverStyle: "hover:border-amber-200 hover:bg-amber-50",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-900">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        What would you like to do?
      </p>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition ${action.hoverStyle}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconStyle}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">
                  {action.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {action.description}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}