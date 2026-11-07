
"use client";

import { useMemo, useState } from "react";

import { submitCustomerReview } from "@/service/reviewService";

import type { Booking, Review } from "@/types/review";


import ReviewStats from "./ReviewStats";
import PendingReviews from "./PendingReviews";
import SubmittedReviews from "./SubmittedReviews";
import ReviewHeader from "./ReviewHeader";

interface CustomerReviewsClientProps {
  initialBookings: Booking[];
  initialReviews: Review[];
}

export default function CustomerReviewsClient({
  initialBookings,
  initialReviews,
}: CustomerReviewsClientProps) {
  const [bookings] = useState<Booking[]>(initialBookings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Identify already reviewed bookings
  const reviewedBookingIds = useMemo(
    () =>
      new Set(
        reviews
          .map((review) => review.bookingId)
          .filter((id): id is string => Boolean(id))
      ),
    [reviews]
  );

  // Pending reviews
  const pendingBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => !reviewedBookingIds.has(booking.id)
      ),
    [bookings, reviewedBookingIds]
  );

  // Handle rating
  function handleRatingChange(bookingId: string, rating: number) {
    setRatings((prev) => ({
      ...prev,
      [bookingId]: rating,
    }));
  }

  // Handle comment
  function handleCommentChange(bookingId: string, comment: string) {
    setComments((prev) => ({
      ...prev,
      [bookingId]: comment,
    }));
  }

  // Submit review
  async function handleSubmit(bookingId: string) {
    const rating = ratings[bookingId] || 0;
    const comment = comments[bookingId]?.trim() || "";

    if (rating < 1 || rating > 5) {
      setMessage("Please select a star rating.");
      return;
    }

    if (!comment) {
      setMessage("Please write your feedback.");
      return;
    }

    setSubmitting(bookingId);
    setMessage("");

    try {
      const result = await submitCustomerReview({
        bookingId,
        rating,
        comment,
      });

      if (!result.success) {
        setMessage(result.message || "Unable to submit review.");
        return;
      }

      setMessage("Your review has been submitted successfully!");

      setRatings((prev) => {
        const updated = { ...prev };
        delete updated[bookingId];
        return updated;
      });

      setComments((prev) => {
        const updated = { ...prev };
        delete updated[bookingId];
        return updated;
      });

      // Refresh review history
      // Prefer returning the newly created review from the API when available.
      const updatedReview =
        "data" in result ? (result.data as Review | undefined) : undefined;

      if (updatedReview) {
        setReviews((prev) => [...prev, updatedReview]);
      } else {
        // If API does not return the created review,
        // reload the page to get fresh server data.
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <ReviewHeader />

        {/* Notification */}
        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700"
          >
            {message}
          </div>
        )}

        {/* Statistics */}
        <ReviewStats
          totalBookings={bookings.length}
          pendingReviews={pendingBookings.length}
          totalReviews={reviews.length}
        />

        {/* Pending Reviews */}
        <PendingReviews
          bookings={pendingBookings}
          ratings={ratings}
          comments={comments}
          submitting={submitting}
          onRatingChange={handleRatingChange}
          onCommentChange={handleCommentChange}
          onSubmit={handleSubmit}
        />

        {/* Submitted Reviews */}
        <SubmittedReviews reviews={reviews} />

      </div>
    </main>
  );
}
