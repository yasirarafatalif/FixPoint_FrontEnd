
import { getCustomerBookings } from "@/service/bookingService";
import { getMyReviews } from "@/service/reviewService";

import type { Booking, Review } from "@/types/review";

import CustomerReviewsClient from "./_components/CustomerReviewsClient";

export const metadata = {
  title: "My Reviews",
  description: "View and manage your submitted reviews.",
};  
export const dynamic = "force-dynamic";

export default async function CustomerReviewsPage() {
  const [bookingResult, reviewResult] = await Promise.all([
    getCustomerBookings(),
    getMyReviews(),
  ]);

  if (!bookingResult.success || !reviewResult.success) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {bookingResult.message ||
              reviewResult.message ||
              "Unable to load your reviews."}
          </div>
        </div>
      </main>
    );
  }

  const bookings: Booking[] = Array.isArray(bookingResult.data)
    ? bookingResult.data.filter(
        (booking: Booking) =>
          booking.status?.toUpperCase() === "COMPLETED"
      )
    : [];

  const reviews: Review[] = Array.isArray(reviewResult.data)
    ? reviewResult.data
    : [];

  return (
    <CustomerReviewsClient
      initialBookings={bookings}
      initialReviews={reviews}
    />
  );
}
