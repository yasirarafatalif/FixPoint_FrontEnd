
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

import { getCustomerBookings } from "@/service/bookingService";
import { CustomerBooking } from "@/types/customerBooking";
import CustomerBookingsClient from "./_components/CustomerBookingsClient";



export const metadata = {
  title: "My Bookings | FixItNow",
  description: "Manage your service bookings and track their status.",
};

export const dynamic = "force-dynamic";

export default async function CustomerBookingsPage() {
  let bookings: CustomerBooking[] = [];
  let error = "";

  try {
    const result = await getCustomerBookings();

    if (!result.success) {
      throw new Error(result.message || "Failed to load your bookings.");
    }

    if (!Array.isArray(result.data)) {
      throw new Error("Invalid booking data received from the server.");
    }

    bookings = result.data as CustomerBooking[];
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Something went wrong while loading bookings.";
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
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

      <CustomerBookingsClient
        initialBookings={bookings}
        initialError={error}
      />
    </div>
  );
}
