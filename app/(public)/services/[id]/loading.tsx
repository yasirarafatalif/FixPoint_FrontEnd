
export default function ServiceDetailsSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F8FAFC] pb-16 font-sans">
      {/* ================= BREADCRUMB ================= */}
      <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-3 w-3 rounded bg-slate-200" />
              <div className="h-4 w-36 rounded bg-slate-200" />
            </div>

            <div className="h-6 w-32 rounded bg-blue-100" />
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            {/* Service Hero Skeleton */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-64 w-full bg-slate-200 sm:h-80" />

              <div className="space-y-5 p-6 sm:p-8">
                <div className="h-4 w-28 rounded bg-blue-100" />

                <div className="h-8 w-3/4 rounded-lg bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-5/6 rounded bg-slate-100" />
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="h-8 w-28 rounded-full bg-slate-100" />
                  <div className="h-8 w-32 rounded-full bg-slate-100" />
                  <div className="h-8 w-24 rounded-full bg-slate-100" />
                </div>
              </div>
            </div>

            {/* Service Info Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="h-6 w-48 rounded bg-slate-200" />

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-5/6 rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-20 rounded-2xl bg-slate-50"
                  />
                ))}
              </div>
            </div>

            {/* Service Features Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="h-6 w-52 rounded bg-slate-200" />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 rounded bg-slate-200" />
                      <div className="h-3 w-full rounded bg-slate-100" />
                      <div className="h-3 w-4/5 rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="space-y-6 lg:sticky lg:top-20">

            {/* Technician Card Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-36 rounded bg-slate-200" />
                <div className="h-6 w-20 rounded-full bg-emerald-100" />
              </div>

              {/* Profile */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-5 w-36 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-100" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </div>

              {/* Technician Details */}
              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-100" />
                    <div className="h-4 w-32 rounded bg-slate-100" />
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="h-4 w-24 rounded bg-slate-200" />

                <div className="mt-4 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-8 w-20 rounded-lg bg-slate-100"
                    />
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="mt-6 h-12 w-full rounded-xl bg-slate-200" />
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}