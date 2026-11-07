
import {
  CheckCircle2,
  MessageSquareText,
  Star,
} from "lucide-react";

import type { Review } from "@/types/review";

type SubmittedReviewsProps = {
  reviews: Review[];
};

export default function SubmittedReviews({
  reviews,
}: SubmittedReviewsProps) {
  const averageRating = reviews.length
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Submitted Reviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your review history and previous feedback.
          </p>
        </div>

        <span className="w-fit rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {reviews.length} Reviews
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MessageSquareText size={27} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No Reviews Yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Your submitted feedback will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="font-bold text-slate-900">
                Review History
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                All your submitted service reviews
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
              <Star
                size={14}
                className="mr-1 inline fill-amber-400"
              />
              {averageRating} Average
            </div>
          </div>

          {/* Reviews Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Technician</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Feedback</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                      {review.bookingId.indexOf("-") !== -1
                        ? review.bookingId.split("-")[0]
                        : review.bookingId}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {review.technicianId.indexOf("-") !== -1
                        ? review.technicianId.split("-")[0]
                        : review.technicianId}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 font-bold text-amber-700">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        {review.rating}/5
                      </span>
                    </td>

                    <td className="max-w-xs px-5 py-4">
                      <p
                        className="line-clamp-2 text-slate-600"
                        title={review.comment}
                      >
                        {review.comment}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 size={13} />
                        Submitted
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-500">
            Showing {reviews.length} submitted reviews
          </div>
        </div>
      )}
    </section>
  );
}
