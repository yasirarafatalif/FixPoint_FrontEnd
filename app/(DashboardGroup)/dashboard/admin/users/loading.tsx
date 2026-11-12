
export default function UserSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-4 w-28 rounded bg-slate-200" />

        <div className="h-8 w-48 rounded-lg bg-slate-200" />

        <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
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
              <div className="h-11 w-11 rounded-xl bg-slate-200" />
            </div>

            <div className="mt-5 h-8 w-20 rounded bg-slate-200" />

            <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="h-11 w-full rounded-xl bg-slate-100 lg:max-w-sm" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-32 rounded-xl bg-slate-100" />
            <div className="h-10 w-32 rounded-xl bg-slate-100" />
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 md:grid">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-3 w-20 rounded bg-slate-200"
            />
          ))}
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-5 md:items-center"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-slate-200" />
                  <div className="h-3 w-36 rounded bg-slate-100" />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-100" />
              </div>

              {/* Role */}
              <div>
                <div className="h-6 w-24 rounded-full bg-slate-200" />
              </div>

              {/* Status */}
              <div>
                <div className="h-6 w-20 rounded-full bg-slate-200" />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
                <div className="h-9 w-9 rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <div className="h-4 w-36 rounded bg-slate-200" />

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
