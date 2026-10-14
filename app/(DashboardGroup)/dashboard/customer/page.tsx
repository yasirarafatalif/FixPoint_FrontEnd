"use client";

import { useEffect, useState } from "react";

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

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const result = await getCustomerBookings();

      if (!result.success) {
        throw new Error(result.message || "Failed to load bookings.");
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

  const now = Date.now();

  const upcomingBookings = bookings
    .filter(
      (booking) =>
        new Date(booking.bookingDate).getTime() >= now &&
        ["REQUESTED", "ACCEPTED", "IN_PROGRESS"].includes(
          booking.status.toUpperCase()
        )
    )
    .sort(
      (a, b) =>
        new Date(a.bookingDate).getTime() -
        new Date(b.bookingDate).getTime()
    );

  const completedBookings = bookings.filter(
    (booking) => booking.status.toUpperCase() === "COMPLETED"
  );

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

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? b.bookingDate).getTime() -
        new Date(a.createdAt ?? a.bookingDate).getTime()
    )
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Loading skeleton */}
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        /* Error state with retry */
        <DashboardFeedback
          loading={false}
          error={error}
          onRetry={() => void loadBookings()}
        />
      ) : (
        /* Dashboard content */
        <>
          <CustomerWelcome />

          <DashboardStats
            totalBookings={bookings.length}
            upcomingBookings={upcomingBookings.length}
            completedBookings={completedBookings.length}
            pendingPaymentTotal={pendingPaymentTotal}
            loading={false}
          />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          

            <QuickActions />
          </section>

          <RecentBookings
            bookings={recentBookings}
            loading={false}
            error=""
          />
        </>
      )}
    </div>
  );
}
