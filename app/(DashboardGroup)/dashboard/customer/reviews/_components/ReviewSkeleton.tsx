
export default function ReviewSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-lg bg-slate-200" />
        <div className="h-4 w-72 max-w-full rounded-md bg-slate-100" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-8 w-16 rounded-lg bg-slate-200" />
              </div>
              <div className="h-12 w-12 rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Pending Reviews Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-40 rounded-lg bg-slate-200" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-36 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-100" />
                </div>
                <div className="h-6 w-20 rounded-full bg-emerald-100" />
              </div>

              <div className="mb-5 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="h-6 w-6 rounded-md bg-amber-100"
                  />
                ))}
              </div>

              <div className="mb-4 h-28 rounded-xl bg-slate-100" />
              <div className="h-11 w-full rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Reviews Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-44 rounded-lg bg-slate-200" />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-4 rounded bg-slate-200"
                />
              ))}
            </div>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="grid grid-cols-5 gap-4 border-b border-slate-100 p-5 last:border-0"
            >
              {[1, 2, 3, 4, 5].map((cell) => (
                <div
                  key={cell}
                  className="h-5 rounded bg-slate-100"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
