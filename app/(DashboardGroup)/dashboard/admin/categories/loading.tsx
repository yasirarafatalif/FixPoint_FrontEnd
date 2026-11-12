
export default function CategorySkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
          </div>

          <div className="h-7 w-56 rounded-lg bg-slate-200" />
          <div className="h-4 w-80 max-w-full rounded bg-slate-200" />
        </div>

        <div className="h-11 w-36 rounded-xl bg-slate-200" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
            </div>

            <div className="mt-5 h-8 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-3 w-56 rounded bg-slate-100" />
          </div>

          <div className="h-10 w-full rounded-xl bg-slate-100 sm:w-64" />
        </div>

        {/* Table Column Headers */}
        <div className="hidden grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 md:grid">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-3 w-20 rounded bg-slate-200" />
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-5 md:items-center"
            >
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-3 w-36 rounded bg-slate-100" />
                </div>
              </div>

              {/* Other Columns */}
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="flex items-center md:justify-start"
                >
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 p-5">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="flex gap-2">
            <div className="h-9 w-9 rounded-lg bg-slate-200" />
            <div className="h-9 w-9 rounded-lg bg-slate-200" />
            <div className="h-9 w-9 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
