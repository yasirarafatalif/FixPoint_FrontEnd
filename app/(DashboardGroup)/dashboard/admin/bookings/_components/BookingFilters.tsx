"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import type { BookingStatus } from "@/types/adminBooking";

interface BookingFiltersProps {
  search: string;
  status: BookingStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: BookingStatus | "ALL"
  ) => void;
}

export default function BookingFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: BookingFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search service, customer or technician..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={17}
            className="text-slate-400"
          />

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as BookingStatus | "ALL"
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}