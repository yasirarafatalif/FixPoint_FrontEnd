
export default function CategoriesSkeleton() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-9 w-52 rounded-full bg-slate-100" />

          <div className="mx-auto mt-6 h-10 w-72 max-w-full rounded-lg bg-slate-200 sm:h-12 sm:w-96" />

          <div className="mx-auto mt-5 max-w-xl space-y-2">
            <div className="mx-auto h-4 w-full rounded bg-slate-100" />
            <div className="mx-auto h-4 w-4/5 rounded bg-slate-100" />
          </div>
        </div>

        {/* Search Skeleton */}
        <div className="mx-auto mt-10 max-w-lg">
          <div className="h-[58px] w-full rounded-2xl border border-slate-200 bg-slate-50" />
        </div>

        {/* Category Header */}
        <div className="mt-12 mb-6 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-44 rounded-md bg-slate-200" />
            <div className="h-4 w-56 max-w-full rounded bg-slate-100" />
          </div>

          <div className="h-9 w-28 shrink-0 rounded-full bg-slate-100" />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              {/* Icon */}
              <div className="h-14 w-14 rounded-2xl bg-slate-100" />

              {/* Content */}
              <div className="mt-6 space-y-3">
                <div className="h-6 w-3/4 rounded-md bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-4 w-28 rounded bg-slate-100" />

                <div className="h-9 w-9 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
