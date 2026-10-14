import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  ArrowUpRight,
  ReceiptText,
} from "lucide-react";



import { CustomerBooking } from "@/types/customerBooking";
import StatusBadge, { Status } from "../../../_components/StatusBadge";

type BookingCardProps = {
  booking: CustomerBooking;
};

function getServiceName(booking: CustomerBooking) {
  return (
    booking.service?.title ??
    booking.service?.name ??
    booking.services?.title ??
    booking.services?.name ??
    "Service"
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ReceiptText className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Booking ID
            </p>

            <p
              title={booking.id}
              className="mt-1 truncate text-sm font-bold text-slate-800"
            >
              {booking.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        <StatusBadge status={booking.status as Status} />
      </div>

      <div className="mt-6">
        <h2 className="line-clamp-2 text-lg font-extrabold text-slate-900 transition group-hover:text-blue-700">
          {getServiceName(booking)}
        </h2>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4 shrink-0 text-blue-500" />

            <span>{formatDate(booking.bookingDate)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock3 className="h-4 w-4 shrink-0 text-blue-500" />

            <span>{formatTime(booking.bookingDate)}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Total amount
            </p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              ৳{Number(booking.totalPrice || 0).toLocaleString("en-US")}
            </p>
          </div>

          <Link
            href={`/dashboard/customer/bookings/${booking.id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}