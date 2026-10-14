import Link from "next/link";
import { ArrowRight } from "lucide-react";


import { CustomerBooking } from "@/types/customerBooking";
import {
  getServiceName,
  getBookingDate,
  getBookingTime,
} from "./bookingUtils";
import StatusBadge, { Status } from "../../_components/StatusBadge";

type RecentBookingsProps = {
  bookings: CustomerBooking[];
  loading: boolean;
  error: string;
};

export default function RecentBookings({
  bookings,
  loading,
  error,
}: RecentBookingsProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of your latest service requests.
          </p>
        </div>

        <Link
          href="/dashboard/customer/bookings"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-800"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-semibold">Booking ID</th>
              <th className="px-6 py-4 font-semibold">Service</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  Loading bookings...
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-red-600"
                >
                  Bookings could not be displayed.
                </td>
              </tr>
            )}

            {!loading && !error && bookings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No bookings found.{" "}
                  <Link
                    href="/services"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Browse services
                  </Link>
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {booking.id.slice(0, 8).toUpperCase()}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {getServiceName(booking)}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {getBookingDate(booking.bookingDate)}
                    <p className="mt-1 text-xs text-slate-400">
                      {getBookingTime(booking.bookingDate)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status as Status} />
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">
                    ৳{Number(booking.totalPrice || 0).toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}