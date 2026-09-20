import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import type { AdminBooking } from "@/types/adminBooking";

interface BookingStatsProps {
  bookings: AdminBooking[];
}

export default function BookingStats({
  bookings,
}: BookingStatsProps) {
  const pending = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const confirmed = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  ).length;

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: CalendarCheck,
      style: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      style: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: XCircle,
      style: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.style}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}