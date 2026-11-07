
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search, ArrowRight } from "lucide-react";

import { getCustomerBookings } from "@/service/bookingService";
import { CustomerBooking } from "@/types/customerBooking";

import CustomerWelcome from "./_components/CustomerWelcome";
import DashboardStats from "./_components/DashboardStats";
import DashboardFeedback from "./_components/DashboardFeedback";
import DashboardSkeleton from "./_components/DashboardSkeleton";
import QuickActions from "./_components/QuickActions";
import RecentBookings from "./_components/RecentBookings";
import { getPaymentStatus } from "./_components/bookingUtils";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings
  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getCustomerBookings();

      if (!result.success) {
        throw new Error(result.message || "Failed to load bookings.");
      }

      setBookings(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  // Upcoming bookings
  const upcomingBookings = bookings.filter(
    (booking) =>
      new Date(booking.bookingDate).getTime() >= Date.now() &&
      ["REQUESTED", "ACCEPTED", "IN_PROGRESS"].includes(
        booking.status.toUpperCase()
      )
  );

  // Completed bookings
  const completedBookings = bookings.filter(
    (booking) => booking.status.toUpperCase() === "COMPLETED"
  );

  // Pending payment
  const pendingPaymentTotal = bookings
    .filter(
      (booking) =>
        ["ACCEPTED", "IN_PROGRESS", "COMPLETED"].includes(
          booking.status.toUpperCase()
        ) &&
        getPaymentStatus(booking) !== "PAID"
    )
    .reduce(
      (total, booking) => total + Number(booking.totalPrice || 0),
      0
    );

  // Recent bookings
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? b.bookingDate).getTime() -
        new Date(a.createdAt ?? a.bookingDate).getTime()
    )
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">

      {/* Loading */}
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (

        /* Error */
        <DashboardFeedback
          loading={false}
          error={error}
          onRetry={() => void loadBookings()}
        />

      ) : (

        /* Dashboard */
        <>
          <CustomerWelcome />

          {bookings.length === 0 ? (

            /* Empty Booking State */
            <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CalendarDays size={38} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                No Bookings Yet!
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                You haven't booked any services yet.
                Explore our services and find the right
                professional for your home.
              </p>

              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Search size={18} />
                Explore Services
                <ArrowRight size={17} />
              </Link>

              <p className="mt-5 text-xs text-slate-400">
                Your bookings will appear here once you book a service.
              </p>
            </section>

          ) : (

            /* Booking Dashboard */
            <>
              <DashboardStats
                totalBookings={bookings.length}
                upcomingBookings={upcomingBookings.length}
                completedBookings={completedBookings.length}
                pendingPaymentTotal={pendingPaymentTotal}
                loading={false}
              />

              <section>
                <QuickActions />
              </section>

              <section>
                <RecentBookings
                  bookings={recentBookings}
                  loading={false}
                  error=""
                />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
