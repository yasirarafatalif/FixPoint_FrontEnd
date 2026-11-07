
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

export default function ReviewHeader() {
  return (
    <div className="mb-8">
      <Link
        href="/dashboard/customer"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
            <Sparkles size={16} />
            Customer Experience
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Reviews & Feedback
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Share your experience, rate completed services and keep track
            of all your feedback.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MessageSquareText size={17} />
          Your feedback matters
        </div>
      </div>
    </div>
  );
}
