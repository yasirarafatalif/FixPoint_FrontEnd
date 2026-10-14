"use client";

import { Search, X } from "lucide-react";

export type BookingFilterStatus =
  | "ALL"
  | "REQUESTED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type BookingFiltersProps = {
  search: string;
  status: BookingFilterStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BookingFilterStatus) => void;
  totalResults: number;
};

export default function BookingFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  totalResults,
}: BookingFiltersProps) {
  function clearFilters() {
    onSearchChange("");
    onStatusChange("ALL");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by service name or booking ID..."
            aria-label="Search bookings"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as BookingFilterStatus)
          }
          aria-label="Filter bookings by status"
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 md:w-56"
        >
          <option value="ALL">All statuses</option>
          <option value="REQUESTED">Requested</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {(search || status !== "ALL") && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-800">{totalResults}</span>{" "}
          {totalResults === 1 ? "booking" : "bookings"}
        </p>

        {(search || status !== "ALL") && (
          <span className="text-xs font-medium text-blue-600">
            Filters applied
          </span>
        )}
      </div>
    </section>
  );
}