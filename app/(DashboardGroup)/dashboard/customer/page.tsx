
import Link from "next/link";
import { CalendarDays, Search, ArrowRight } from "lucide-react";

import { getCustomerBookings } from "@/service/bookingService";
import { CustomerBooking } from "@/types/customerBooking";

import CustomerWelcome from "./_components/CustomerWelcome";
import DashboardStats from "./_components/DashboardStats";
import DashboardFeedback from "./_components/DashboardFeedback";
import QuickActions from "./_components/QuickActions";
import RecentBookings from "./_components/RecentBookings";
import { getPaymentStatus } from "./_components/bookingUtils";

function getCurrentTimestamp() {
  return Date.now();
}

export const metadata={
  title:"Coustomer Dahsboard | FitItNow"
}

export const dynamic = "force-dynamic";

export default async function CustomerDashboard() {
  let bookings: CustomerBooking[] = [];

  try {
    const result = await getCustomerBookings();

    if (!result.success) {
      throw new Error(result.message || "Failed to load bookings.");
    }

    bookings = Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong.";

    return (
      <div className="mx-auto max-w-7xl space-y-8 pb-10">
        <DashboardFeedback
          loading={false}
          error={message}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Upcoming bookings
  const currentTimestamp = getCurrentTimestamp();
  const upcomingBookings = bookings.filter(
    (booking) =>
      new Date(booking.bookingDate).getTime() >= currentTimestamp &&
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
      <CustomerWelcome />

      {bookings.length === 0 ? (
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
    </div>
  );
}
