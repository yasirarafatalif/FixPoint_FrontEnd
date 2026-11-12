

export default function TechnicianProfileSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Profile */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="h-28 w-28 shrink-0 rounded-[30px] bg-slate-700" />

              {/* Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-9 w-64 max-w-full rounded-lg bg-slate-700" />
                  <div className="h-7 w-40 rounded-full bg-slate-800" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-full max-w-xl rounded bg-slate-700" />
                  <div className="h-4 w-4/5 max-w-lg rounded bg-slate-700" />
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="h-4 w-32 rounded bg-slate-700" />
                  <div className="h-4 w-36 rounded bg-slate-700" />
                  <div className="h-4 w-40 rounded bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* About Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="h-5 w-56 max-w-full rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
              </div>
            </div>

            {/* Skills Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-slate-200" />
                  <div className="h-5 w-48 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {[100, 130, 115, 90, 145, 110].map((width, i) => (
                  <div
                    key={i}
                    style={{ width }}
                    className="h-10 rounded-xl bg-slate-100"
                  />
                ))}
              </div>
            </div>

            {/* Services Skeleton */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="h-5 w-52 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 p-5"
                  >
                    <div className="h-5 w-3/4 rounded bg-slate-200" />

                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-slate-100" />
                      <div className="h-3 w-4/5 rounded bg-slate-100" />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="h-5 w-20 rounded bg-slate-200" />
                      <div className="h-4 w-16 rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Skeleton */}
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-100" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-48 rounded bg-blue-100" />
                  <div className="h-3 w-full rounded bg-blue-100" />
                  <div className="h-3 w-4/5 rounded bg-blue-100" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING CARD SKELETON */}
          <aside>
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-6 w-40 rounded bg-slate-200" />

              <div className="h-4 w-56 rounded bg-slate-100" />

              {/* Service Selection */}
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-9 rounded-lg bg-slate-100"
                    />
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-20 w-full rounded-xl bg-slate-100" />
              </div>

              {/* Button */}
              <div className="h-12 w-full rounded-xl bg-slate-200" />
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}