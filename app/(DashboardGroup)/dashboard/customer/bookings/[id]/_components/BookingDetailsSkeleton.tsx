
import {
  ArrowLeft,
} from "lucide-react";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
    />
  );
}

function SkeletonSection({
  rows = 3,
}: {
  rows?: number;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full max-w-sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BookingDetailsSkeleton() {
  return (
    <main
      className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8"
      aria-label="Loading booking details"
      aria-busy="true"
    >
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <ArrowLeft size={18} />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Booking header */}
        <section className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 sm:p-8">
            <Skeleton className="mb-4 h-4 w-48 bg-blue-400/50" />
            <Skeleton className="h-8 w-3/4 max-w-md bg-blue-400/50" />
            <Skeleton className="mt-3 h-4 w-40 bg-blue-400/50" />
            <Skeleton className="mt-5 h-4 w-64 max-w-full bg-blue-400/50" />
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="h-6 w-6 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32 max-w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            <SkeletonSection rows={4} />
            <SkeletonSection rows={2} />
            <SkeletonSection rows={3} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <div className="mb-6 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-6 w-40" />
              </div>

              <div className="space-y-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4"
                  >
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}

                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-3 w-full" />
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <Skeleton className="mb-5 h-5 w-44" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
