import Link from "next/link";
import { ArrowRight, Search, Wrench } from "lucide-react";

export default function CustomerWelcome() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 px-6 py-8 text-white sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 right-1/3 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Customer Dashboard
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Welcome back!
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
            Manage your bookings, track your services, and keep your
            home running smoothly with FixItNow.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-blue-50"
          >
            <Search className="h-4 w-4" />
            Browse Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/10 md:flex">
          <Wrench
            className="h-16 w-16 text-blue-100"
            strokeWidth={1.4}
          />
        </div>
      </div>
    </section>
  );
}