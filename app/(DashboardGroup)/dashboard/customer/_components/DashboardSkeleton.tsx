
export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Welcome banner skeleton */}
      <section className="rounded-3xl bg-slate-200 p-8 sm:p-10">
        <div className="h-5 w-36 rounded-full bg-slate-300" />
        <div className="mt-6 h-9 w-64 max-w-full rounded-lg bg-slate-300" />
        <div className="mt-4 h-4 w-full max-w-md rounded bg-slate-300" />
        <div className="mt-2 h-4 w-3/4 max-w-sm rounded bg-slate-300" />
        <div className="mt-6 h-11 w-40 rounded-xl bg-slate-300" />
      </section>

      {/* Stats skeleton */}
      <section>
        <div className="mb-5 space-y-2">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="h-4 w-64 max-w-full rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-9 w-20 rounded bg-slate-200" />
                </div>
                <div className="h-12 w-12 rounded-2xl bg-slate-200" />
              </div>
              <div className="mt-5 h-3 w-36 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming booking + quick actions */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="h-4 w-52 max-w-full rounded bg-slate-100" />
            </div>
            <div className="h-6 w-6 rounded bg-slate-200" />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-6 w-52 max-w-full rounded bg-slate-200" />
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-4 w-24 rounded bg-slate-200" />
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center">
              <div className="h-8 w-28 rounded bg-slate-200" />
              <div className="h-11 w-36 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-44 rounded bg-slate-100" />

          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-3 w-36 max-w-full rounded bg-slate-100" />
                </div>
                <div className="h-4 w-4 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent bookings table skeleton */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-64 max-w-full rounded bg-slate-100" />
        </div>

        <div className="space-y-0 divide-y divide-slate-100">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-5 px-6 py-5"
            >
              <div className="h-4 w-20 shrink-0 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="hidden h-4 w-28 rounded bg-slate-100 sm:block" />
              <div className="h-6 w-20 rounded-full bg-slate-200" />
              <div className="ml-auto h-4 w-16 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}