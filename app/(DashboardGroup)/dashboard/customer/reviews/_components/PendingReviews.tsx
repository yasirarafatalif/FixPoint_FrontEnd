
"use client";

import { CheckCircle2 } from "lucide-react";

import type { Booking } from "@/types/review";
import ReviewFormCard from "./ReviewFormCard";

type PendingReviewsProps = {
  bookings: Booking[];
  ratings: Record<string, number>;
  comments: Record<string, string>;
  submitting: string | null;
  onRatingChange: (bookingId: string, rating: number) => void;
  onCommentChange: (bookingId: string, comment: string) => void;
  onSubmit: (bookingId: string) => void;
};

export default function PendingReviews({
  bookings,
  ratings,
  comments,
  submitting,
  onRatingChange,
  onCommentChange,
  onSubmit,
}: PendingReviewsProps) {
  return (
    <section className="mb-10">

      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Pending Reviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Services waiting for your feedback.
          </p>
        </div>

        <span className="w-fit rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
          {bookings.length} Pending
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            You're All Caught Up!
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            No pending reviews. All your completed services have been reviewed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {bookings.map((booking) => (
            <ReviewFormCard
              key={booking.id}
              booking={booking}
              rating={ratings[booking.id] || 0}
              comment={comments[booking.id] || ""}
              submitting={submitting === booking.id}
              onRatingChange={(rating) =>
                onRatingChange(booking.id, rating)
              }
              onCommentChange={(comment) =>
                onCommentChange(booking.id, comment)
              }
              onSubmit={() => onSubmit(booking.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
