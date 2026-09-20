"use client";

import {
  CalendarDays,
  Eye,
  Mail,
  UserRound,
} from "lucide-react";

import type {
  AdminBooking,
  BookingStatus,
} from "@/types/adminBooking";

interface BookingTableProps {
  bookings: AdminBooking[];
}

export default function BookingTable({
  bookings,
}: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <CalendarDays
            size={22}
            className="text-slate-400"
          />
        </div>

        <h3 className="font-semibold text-slate-900">
          No bookings found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Service
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Customer
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Technician
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Booking Date
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Amount
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="transition hover:bg-slate-50/70"
            >
              {/* Service */}
              <td className="px-5 py-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {booking.service.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    ID: {booking.id.slice(-8)}
                  </p>
                </div>
              </td>

              {/* Customer */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserRound size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {booking.customer.name}
                    </p>

                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <Mail size={11} />
                      {booking.customer.email}
                    </p>
                  </div>
                </div>
              </td>

              {/* Technician */}
              <td className="px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {booking.technician.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {booking.technician.email}
                  </p>
                </div>
              </td>

              {/* Date */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <CalendarDays size={14} />

                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>

              {/* Amount */}
              <td className="px-5 py-4">
                <span className="font-semibold text-slate-900">
                  ৳{booking.totalAmount}
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <BookingStatusBadge
                  status={booking.status}
                />
              </td>

              {/* Action */}
              <td className="px-5 py-4">
                <div className="flex justify-end">
                  <button
                    title="View booking"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookingStatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const styles = {
    PENDING:
      "border-amber-100 bg-amber-50 text-amber-700",
    CONFIRMED:
      "border-blue-100 bg-blue-50 text-blue-700",
    COMPLETED:
      "border-emerald-100 bg-emerald-50 text-emerald-700",
    CANCELLED:
      "border-red-100 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}