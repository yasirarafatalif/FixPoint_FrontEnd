
export default function ServicesSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-9 w-72 max-w-full rounded-lg bg-slate-200" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Search & Filter */}
        <div className="mb-8 space-y-5">
          {/* Search Bar */}
          <div className="h-12 w-full rounded-xl border border-slate-200 bg-white" />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {[90, 110, 130, 105, 120, 95, 140].map(
              (width, index) => (
                <div
                  key={index}
                  style={{ width }}
                  className="h-10 rounded-xl bg-white border border-slate-200"
                />
              ),
            )}
          </div>

          {/* Result Count / Sorting */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-36 rounded bg-slate-200" />
            <div className="h-10 w-32 rounded-xl bg-white border border-slate-200" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Card Header / Image */}
              <div className="h-44 w-full bg-slate-200" />

              {/* Card Content */}
              <div className="space-y-4 p-5">
                {/* Title */}
                <div className="h-5 w-3/4 rounded bg-slate-200" />

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-3 w-5/6 rounded bg-slate-100" />
                </div>

                {/* Technician Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-100" />
                  </div>
                </div>

                {/* Price & Duration */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="h-5 w-24 rounded bg-slate-200" />
                  <div className="h-4 w-20 rounded bg-slate-100" />
                </div>

                {/* Button */}
                <div className="h-11 w-full rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 w-10 rounded-lg bg-slate-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
