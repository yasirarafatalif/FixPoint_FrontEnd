
export default function ContactSkeleton() {
  return (
    <main className="overflow-hidden bg-white animate-pulse">

      {/* Hero Section */}
      <section className="relative bg-slate-950 px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-9 w-48 rounded-full bg-white/10" />

          <div className="mx-auto mt-7 max-w-3xl space-y-3">
            <div className="mx-auto h-10 w-4/5 rounded-lg bg-white/10 sm:h-14" />
            <div className="mx-auto h-10 w-2/3 rounded-lg bg-white/10 sm:h-14" />
          </div>

          <div className="mx-auto mt-6 max-w-2xl space-y-2">
            <div className="mx-auto h-4 w-full rounded bg-white/10" />
            <div className="mx-auto h-4 w-4/5 rounded bg-white/10" />
          </div>

          <div className="mt-9 flex justify-center gap-5">
            <div className="h-5 w-32 rounded bg-white/10" />
            <div className="h-5 w-32 rounded bg-white/10" />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-100" />

              <div className="mt-5 h-5 w-28 rounded bg-slate-200" />
              <div className="mt-3 h-5 w-48 max-w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-40 max-w-full rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="h-4 w-28 rounded bg-slate-200" />

            <div className="mt-5 space-y-3">
              <div className="h-10 w-64 max-w-full rounded-lg bg-slate-200" />
              <div className="h-10 w-56 max-w-full rounded-lg bg-slate-200" />
            </div>

            <div className="mt-6 max-w-md space-y-2">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-4/5 rounded bg-slate-100" />
            </div>

            {/* Support Items */}
            <div className="mt-9 space-y-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-100" />

                  <div className="flex-1 space-y-3 pt-1">
                    <div className="h-5 w-40 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-3/4 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* Help Box */}
            <div className="mt-10 rounded-2xl bg-blue-50 p-6">
              <div className="h-5 w-40 rounded bg-blue-100" />
              <div className="mt-3 h-4 w-full rounded bg-blue-100" />
              <div className="mt-2 h-4 w-4/5 rounded bg-blue-100" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
            <div className="h-8 w-56 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-64 max-w-full rounded bg-slate-100" />

            <div className="mt-8 space-y-5">

              {/* Name & Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index}>
                    <div className="mb-3 h-4 w-28 rounded bg-slate-200" />
                    <div className="h-[52px] rounded-xl border border-slate-200 bg-slate-50" />
                  </div>
                ))}
              </div>

              {/* Subject */}
              <div>
                <div className="mb-3 h-4 w-20 rounded bg-slate-200" />
                <div className="h-[52px] rounded-xl border border-slate-200 bg-slate-50" />
              </div>

              {/* Message */}
              <div>
                <div className="mb-3 h-4 w-32 rounded bg-slate-200" />
                <div className="h-40 rounded-xl border border-slate-200 bg-slate-50" />
              </div>

              {/* Submit Button */}
              <div className="h-14 rounded-xl bg-blue-100" />

              <div className="mx-auto h-3 w-64 max-w-full rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">

          {/* FAQ Header */}
          <div className="text-center">
            <div className="mx-auto h-4 w-16 rounded bg-slate-200" />
            <div className="mx-auto mt-4 h-9 w-80 max-w-full rounded-lg bg-slate-200" />

            <div className="mx-auto mt-4 h-4 w-64 max-w-full rounded bg-slate-100" />
          </div>

          {/* FAQ Items */}
          <div className="mt-10 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-5 w-5 shrink-0 rounded bg-slate-100" />
                </div>

                {index === 0 && (
                  <div className="mt-5 space-y-2">
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-4/5 rounded bg-slate-100" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 rounded-3xl bg-blue-600 px-7 py-12 sm:px-12 lg:flex-row">
          <div className="w-full space-y-4 text-center lg:text-left">
            <div className="mx-auto h-8 w-72 max-w-full rounded bg-white/20 lg:mx-0" />
            <div className="mx-auto h-4 w-80 max-w-full rounded bg-white/20 lg:mx-0" />
          </div>

          <div className="h-12 w-44 shrink-0 rounded-xl bg-white/30" />
        </div>
      </section>

    </main>
  );
}
