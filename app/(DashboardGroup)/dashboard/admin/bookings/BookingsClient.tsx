"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";

import type { AdminBooking, BookingStatus } from "@/types/adminBooking";

import BookingStats from "./_components/BookingStats";
import BookingFilters from "./_components/BookingFilters";
import BookingTable from "./_components/BookingTable";

interface BookingsClientProps {
  bookings: AdminBooking[];
}

export default function BookingsClient({ bookings }: BookingsClientProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatus | "ALL">("ALL");

  const filteredBookings = bookings.filter((booking) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      booking.service?.title?.toLowerCase().includes(searchValue) ||
      booking.customer?.name?.toLowerCase().includes(searchValue) ||
      booking.technician?.name?.toLowerCase().includes(searchValue);

    const matchesStatus = status === "ALL" || booking.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays size={19} />
          </div>

          <span className="text-sm font-medium text-blue-600">
            Administration
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Manage Bookings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage all customer bookings.
        </p>
      </div>

      {/* Stats */}
      <BookingStats bookings={bookings} />

      {/* Filters */}
      <BookingFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <BookingTable bookings={filteredBookings} />
      </div>
    </div>
  );
}
