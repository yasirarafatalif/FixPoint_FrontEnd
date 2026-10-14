export default function BookingsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Summary skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-9 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Filter skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="h-12 flex-1 rounded-xl bg-slate-200" />
          <div className="h-12 md:w-56 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Booking cards skeleton */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-slate-200" />
                  <div className="h-4 w-24 rounded bg-slate-200" />
                </div>
              </div>
              <div className="h-6 w-20 rounded-full bg-slate-200" />
            </div>

            <div className="mt-6 h-6 w-3/4 rounded bg-slate-200" />

            <div className="mt-5 space-y-4">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
            </div>

            <div className="mt-7 flex items-end justify-between border-t border-slate-100 pt-4">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-7 w-24 rounded bg-slate-200" />
              </div>
              <div className="h-10 w-24 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}