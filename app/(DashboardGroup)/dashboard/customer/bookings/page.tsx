"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ArrowLeft,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import { getCustomerBookings } from "@/service/bookingService";
import { CustomerBooking } from "@/types/customerBooking";

import BookingFilters, {
  BookingFilterStatus,
} from "./_components/BookingFilters";
import BookingCard from "./_components/BookingCard";
import BookingsSkeleton from "./_components/BookingsSkeleton";

function normalizeStatus(status: string): string {
  const normalized = status.toUpperCase();

  if (normalized === "CANCELED") return "CANCELLED";

  return normalized;
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingFilterStatus>("ALL");

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const result = await getCustomerBookings();

      if (!result.success) {
        throw new Error(result.message || "Failed to load your bookings.");
      }

      if (!Array.isArray(result.data)) {
        throw new Error("Invalid booking data received from the server.");
      }

      setBookings(result.data as CustomerBooking[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading bookings."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings
      .filter((booking) => {
        const serviceName =
          booking.service?.title ??
          booking.service?.name ??
          booking.services?.title ??
          booking.services?.name ??
          "Service";

        const matchesSearch =
          !query ||
          serviceName.toLowerCase().includes(query) ||
          booking.id.toLowerCase().includes(query);

        const matchesStatus =
          status === "ALL" ||
          normalizeStatus(booking.status) === status;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? b.bookingDate).getTime() -
          new Date(a.createdAt ?? a.bookingDate).getTime()
      );
  }, [bookings, search, status]);

  const requestedCount = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "REQUESTED"
  ).length;

  const acceptedCount = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "ACCEPTED"
  ).length;

  const completedCount = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "COMPLETED"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "CANCELLED"
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Page header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/dashboard/customer"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your service bookings, check their status, and view
            booking details.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
          Book a Service
        </Link>
      </section>

      {/* Loading skeleton */}
      {loading ? (
        <BookingsSkeleton />
      ) : error ? (
        /* Error state */
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

            <div>
              <h2 className="font-bold text-red-800">
                Could not load your bookings
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => void loadBookings()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Summary cards */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SummaryCard
              title="Total Bookings"
              value={bookings.length}
              icon={<CalendarDays className="h-5 w-5" />}
              iconStyle="bg-blue-50 text-blue-600"
            />

            <SummaryCard
              title="Requested"
              value={requestedCount}
              icon={<Clock3 className="h-5 w-5" />}
              iconStyle="bg-amber-50 text-amber-600"
            />

            <SummaryCard
              title="Accepted"
              value={acceptedCount}
              icon={<CheckCircle2 className="h-5 w-5" />}
              iconStyle="bg-violet-50 text-violet-600"
            />

            <SummaryCard
              title="Completed"
              value={completedCount}
              icon={<CheckCircle2 className="h-5 w-5" />}
              iconStyle="bg-emerald-50 text-emerald-600"
            />
          </section>

          {/* Search and filters */}
          <BookingFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            totalResults={filteredBookings.length}
          />

          {/* Booking cards */}
          {filteredBookings.length > 0 ? (
            <section>
              <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Your Service Bookings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select a booking to view its details.
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  {filteredBookings.length}{" "}
                  {filteredBookings.length === 1 ? "result" : "results"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                  />
                ))}
              </div>
            </section>
          ) : (
            /* Empty state */
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                {search || status !== "ALL" ? (
                  <Search className="h-8 w-8" />
                ) : (
                  <CalendarDays className="h-8 w-8" />
                )}
              </div>

              <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                {search || status !== "ALL"
                  ? "No matching bookings"
                  : "No bookings yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search || status !== "ALL"
                  ? "Try another search term or change the status filter."
                  : "You haven't booked any services yet. Find a professional and book your first service."}
              </p>

              {search || status !== "ALL" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatus("ALL");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <XCircle className="h-4 w-4" />
                  Clear Filters
                </button>
              ) : (
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Explore Services
                </Link>
              )}
            </section>
          )}

          {cancelledCount > 0 && (
            <p className="text-xs text-slate-400">
              You also have {cancelledCount} cancelled{" "}
              {cancelledCount === 1 ? "booking" : "bookings"}.
            </p>
          )}
        </>
      )}
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconStyle: string;
};

function SummaryCard({
  title,
  value,
  icon,
  iconStyle,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-slate-500 sm:text-sm">
          {title}
        </p>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}