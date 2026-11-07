
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  MessageSquareText,
  Star,
} from "lucide-react";

import { getCustomerBookings } from "@/service/bookingService";
import { submitCustomerReview } from "@/service/reviewService";

type Booking = {
  id: string;
  status: string;
  service?: {
    title?: string;
    name?: string;
  } | null;
  review?: unknown;
  reviews?: unknown[];
};

export default function CustomerReviewsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const result = await getCustomerBookings();

        if (!result.success) {
          setError(result.message || "Unable to load bookings.");
          return;
        }

        const allBookings = Array.isArray(result.data)
          ? (result.data as Booking[])
          : [];

        setBookings(
          allBookings.filter(
            (booking) => booking.status?.toUpperCase() === "COMPLETED",
          ),
        );
      } catch (err) {
        console.error(err);
        setError("Unable to load your completed bookings.");
      } finally {
        setLoading(false);
      }
    }

    void loadBookings();
  }, []);

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

      setReviewed((previous) => [...previous, bookingId]);
      setMessage("Your review has been submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard/customer"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Customer Dashboard
        </Link>

        <header className="mb-8 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-7 text-white shadow-lg sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <MessageSquareText size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Share Your Experience
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Your feedback helps us improve FixItNow and helps other customers
            choose better home services.
          </p>
        </header>

        {message && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
          >
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-12 text-gray-500">
            <LoaderCircle size={22} className="animate-spin" />
            Loading completed bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
              <Star size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No Completed Bookings Yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Once your service is completed, you can share your experience
              and rate the service here.
            </p>

            <Link
              href="/dashboard/customer"
              className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              View My Bookings
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const alreadyReviewed =
                reviewed.includes(booking.id) ||
                Boolean(booking.review) ||
                Boolean(booking.reviews?.length);

              const serviceName =
                booking.service?.title ??
                booking.service?.name ??
                "Home Service";

              return (
                <article
                  key={booking.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>

                      <h2 className="mt-3 text-lg font-bold text-gray-900">
                        {serviceName}
                      </h2>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        Booking ID: {booking.id}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/customer/bookings/${encodeURIComponent(booking.id)}`}
                      className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                      View Booking →
                    </Link>
                  </div>

                  {alreadyReviewed ? (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                      <CheckCircle2 size={18} className="mr-2 inline" />
                      Review submitted or already exists for this booking.
                    </div>
                  ) : (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <p className="text-sm font-semibold text-gray-800">
                        Rate your experience
                      </p>

                      <div className="mt-3 flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = star <= (ratings[booking.id] || 0);

                          return (
                            <button
                              key={star}
                              type="button"
                              aria-label={`Rate ${star} out of 5 stars`}
                              aria-pressed={active}
                              onClick={() =>
                                setRatings((previous) => ({
                                  ...previous,
                                  [booking.id]: star,
                                }))
                              }
                              className="rounded-lg p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                              <Star
                                size={30}
                                className={
                                  active
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                }
                              />
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        {ratings[booking.id]
                          ? `${ratings[booking.id]} out of 5 stars selected`
                          : "Select a rating from 1 to 5"}
                      </p>

                      <label
                        htmlFor={`comment-${booking.id}`}
                        className="mt-5 block text-sm font-semibold text-gray-800"
                      >
                        Your Feedback
                      </label>

                      <textarea
                        id={`comment-${booking.id}`}
                        value={comments[booking.id] || ""}
                        onChange={(event) =>
                          setComments((previous) => ({
                            ...previous,
                            [booking.id]: event.target.value,
                          }))
                        }
                        placeholder="Tell us about your service experience..."
                        rows={4}
                        maxLength={1000}
                        className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />

                      <div className="mt-2 flex justify-end text-xs text-gray-400">
                        {(comments[booking.id] || "").length}/1000
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleSubmit(booking.id)}
                        disabled={submitting === booking.id}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {submitting === booking.id ? (
                          <>
                            <LoaderCircle
                              size={18}
                              className="animate-spin"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <MessageSquareText size={18} />
                            Submit Review
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
