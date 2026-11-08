
export default function TechnicianBookingsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-200" />
        </div>

        <div className="h-7 w-56 rounded-lg bg-slate-200" />
        <div className="mt-2 h-4 w-72 max-w-full rounded bg-slate-100" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="mt-3 h-8 w-12 rounded bg-slate-200" />
              </div>

              <div className="h-11 w-11 rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-11 w-full rounded-xl bg-slate-100 sm:max-w-md" />
          <div className="h-11 w-full rounded-xl bg-slate-100 sm:w-40" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="hidden grid-cols-6 gap-4 border-b border-slate-200 bg-slate-50 p-5 md:grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-20 rounded bg-slate-200"
            />
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 p-5 md:grid-cols-6 md:items-center"
            >
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  <div className="h-3 w-16 rounded bg-slate-100 md:hidden" />
                  <div className="h-4 w-full max-w-28 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
