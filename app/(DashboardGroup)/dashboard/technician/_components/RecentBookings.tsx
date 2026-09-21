import { CalendarDays, ChevronRight } from "lucide-react";
import type { TechnicianBooking } from "@/types/technicianBooking";
import Link from "next/link";

interface Props {
  bookings: TechnicianBooking[];
}

export default function RecentBookings({ bookings }: Props) {
  console.log(bookings)
  const recentBookings = bookings.slice(0, 3);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest booking requests
          </p>
        </div>

        <Link
          href="/dashboard/technician/bookings"
          className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {recentBookings.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">
            No bookings found.
          </div>
        ) : (
          recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-violet-600">
                  {"Booking".slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900">
                    Booking ID : {booking.id}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {/* {booking.customer.name} */}
                    {"Booking.Name"}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <CalendarDays size={13} />
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-slate-900">
                  ৳{booking.totalPrice.toLocaleString()}
                </p>

                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    booking.status === "COMPLETED"
                      ? "bg-emerald-50 text-emerald-700"
                      : booking.status === "CONFIRMED"
                      ? "bg-blue-50 text-blue-700"
                      : booking.status === "CANCELLED"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}