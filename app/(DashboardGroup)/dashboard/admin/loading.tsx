
export default function AdminDashboardSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header Skeleton */}
        <header className="rounded-2xl bg-slate-800 p-6 md:p-10">
          <div className="h-4 w-48 rounded bg-slate-600" />

          <div className="mt-5 h-10 w-64 max-w-full rounded-lg bg-slate-600 md:h-12 md:w-80" />

          <div className="mt-4 h-4 w-full max-w-xl rounded bg-slate-600" />
        </header>

        {/* Stats Cards */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-8 w-8 rounded-lg bg-slate-200" />
              </div>

              <div className="mt-5 h-9 w-20 rounded-lg bg-slate-200" />

              <div className="mt-4 h-6 w-28 rounded-full bg-slate-100" />
            </div>
          ))}
        </section>

        {/* Management Sections */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* User Management */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Section Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="h-4 w-52 max-w-full rounded bg-slate-100" />
              </div>

              <div className="h-10 w-28 shrink-0 rounded-lg bg-slate-200" />
            </div>

            {/* User List */}
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-32 max-w-full rounded bg-slate-200" />
                    <div className="h-3 w-44 max-w-full rounded bg-slate-100" />
                  </div>

                  <div className="h-6 w-20 shrink-0 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Section Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="h-4 w-52 max-w-full rounded bg-slate-100" />
              </div>

              <div className="h-10 w-24 shrink-0 rounded-lg bg-slate-200" />
            </div>

            {/* Booking List */}
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-36 max-w-full rounded bg-slate-200" />
                    <div className="h-3 w-28 rounded bg-slate-100" />
                  </div>

                  <div className="h-6 w-24 shrink-0 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
