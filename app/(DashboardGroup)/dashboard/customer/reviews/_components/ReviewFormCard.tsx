
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  LoaderCircle,
  MessageSquareText,
  Star,
} from "lucide-react";

import type { Booking } from "@/types/review";

type ReviewFormCardProps = {
  booking: Booking;
  rating: number;
  comment: string;
  submitting: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
};

export default function ReviewFormCard({
  booking,
  rating,
  comment,
  submitting,
  onRatingChange,
  onCommentChange,
  onSubmit,
}: ReviewFormCardProps) {
  const serviceName =
    booking.service?.title ||
    booking.service?.name ||
    "Home Service";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5 sm:p-6">

        {/* Booking Information */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ClipboardCheck size={23} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                {serviceName}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Booking ID: {booking.id}
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            <CheckCircle2 size={12} className="mr-1 inline" />
            Completed
          </span>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* Rating */}
        <div>
          <p className="text-sm font-semibold text-slate-800">
            How was your experience?
          </p>

          <div className="mt-3 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Rate ${star} out of 5 stars`}
                aria-pressed={star <= rating}
                onClick={() => onRatingChange(star)}
                className="rounded-lg p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <Star
                  size={27}
                  className={
                    star <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }
                />
              </button>
            ))}

            <span className="ml-2 text-xs font-medium text-slate-400">
              {rating ? `${rating}/5` : "Rate service"}
            </span>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-5">
          <label
            htmlFor={`comment-${booking.id}`}
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Write your feedback
          </label>

          <textarea
            id={`comment-${booking.id}`}
            value={comment}
            onChange={(event) =>
              onCommentChange(event.target.value)
            }
            placeholder="Tell us about your experience..."
            rows={3}
            maxLength={1000}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {comment.length}/1000
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/dashboard/customer/bookings/${encodeURIComponent(booking.id)}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-blue-700"
          >
            View Booking
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquareText size={17} />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
