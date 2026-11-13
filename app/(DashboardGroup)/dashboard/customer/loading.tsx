
export default function CustomerDashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10 animate-pulse">
      {/* Welcome Skeleton */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-3">
          <div className="h-7 w-56 rounded-lg bg-slate-200" />
          <div className="h-4 w-72 max-w-full rounded-md bg-slate-100" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="h-10 w-32 rounded-xl bg-slate-100" />
          <div className="h-10 w-28 rounded-xl bg-slate-100" />
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-100" />
              <div className="h-11 w-11 rounded-xl bg-blue-50" />
            </div>

            <div className="mt-5 h-8 w-24 rounded-lg bg-slate-200" />
            <div className="mt-3 h-3 w-36 rounded bg-slate-100" />
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="space-y-5">
        <div className="h-6 w-40 rounded-lg bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-blue-50" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-44 max-w-full rounded bg-slate-100" />
              </div>

              <div className="h-5 w-5 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 rounded-lg bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-100" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-100" />

                <div className="space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="h-3 w-48 max-w-full rounded bg-slate-100" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="h-7 w-24 rounded-full bg-blue-50" />
                <div className="h-5 w-20 rounded bg-slate-100" />
                <div className="h-9 w-20 rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
