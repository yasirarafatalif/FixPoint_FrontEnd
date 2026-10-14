
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CreditCard,
} from "lucide-react";
import type { BookingDetailsData } from "./bookingDetails.types";
import { StatusBadge } from "./BookingDetailsPrimitives";

export default function BookingDetailsHeader({
  booking,
  bookingId,
}: {
  booking: BookingDetailsData;
  bookingId: string;
}) {
  return (
    <>
      <Link
        href="/dashboard/customer/bookings"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        Back to My Bookings
      </Link>

      <section className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white sm:p-8">
          <p className="mb-2 text-sm text-blue-100">
            Customer Dashboard / Booking Details
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {booking.serviceName}
              </h1>
              <p className="mt-2 text-sm text-blue-100">
                {booking.category}
              </p>
              <p className="mt-4 break-all text-sm text-blue-100">
                Booking ID: {bookingId}
              </p>
            </div>

            <div>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 text-blue-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Booking Date</p>
              <p className="mt-1 font-semibold text-gray-900">
                {booking.bookingDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock3 className="mt-1 text-blue-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Time Slot</p>
              <p className="mt-1 font-semibold text-gray-900">
                {booking.bookingTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="mt-1 text-blue-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <div className="mt-1">
                <StatusBadge status={booking.paymentStatus} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

