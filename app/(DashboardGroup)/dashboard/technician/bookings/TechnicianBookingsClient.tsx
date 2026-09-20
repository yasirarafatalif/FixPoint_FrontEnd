"use client";

import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";

import type {
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/technicianBooking";

import BookingStats from "./_components/BookingStats";
import BookingTable from "./_components/BookingTable";

interface Props {
  bookings: TechnicianBooking[];
}

export default function TechnicianBookingsClient({
  bookings,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "ALL" | TechnicianBookingStatus
  >("ALL");

  const filteredBookings = bookings.filter(
    (booking) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        booking.service?.title
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.customer?.name
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.customer?.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "ALL" ||
        booking.status === status;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays size={19} />
          </div>

          <span className="text-sm font-medium text-blue-600">
            Technician
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Incoming Bookings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your customer booking requests.
        </p>
      </div>

      {/* Stats */}
      <BookingStats
        bookings={bookings}
      />

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customer or service..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "ALL"
                  | TechnicianBookingStatus
              )
            }
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 outline-none"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <BookingTable
          bookings={filteredBookings}
        />
      </div>

    </div>
  );
}