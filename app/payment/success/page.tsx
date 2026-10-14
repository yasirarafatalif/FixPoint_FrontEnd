
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Home,
  ReceiptText,
  Sparkles,
} from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative w-full max-w-xl">
        {/* Brand */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-xl font-extrabold tracking-tight text-slate-900"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
            <Home size={21} />
          </span>
          FixIt<span className="text-blue-700">Now</span>
        </Link>

        {/* Success card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">
            {/* Success icon */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-100" />
              <div className="absolute inset-2 rounded-full bg-emerald-200/60" />
              <CheckCircle2
                size={54}
                strokeWidth={1.8}
                className="relative text-emerald-600"
              />
              <Sparkles
                size={20}
                className="absolute -right-1 top-1 text-amber-500"
              />
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Payment Successful
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              You’re all set!
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
              Your payment has been verified successfully. Thank you for
              choosing FixItNow for your home service needs.
            </p>

            {/* Booking reference */}
            {bookingId && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
                    <ReceiptText size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Booking Reference
                    </p>
                    <p className="mt-1 break-all text-sm font-bold text-slate-900">
                      {bookingId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation note */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-left">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-blue-700"
              />
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Secure transaction
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Your payment has been verified by the FixItNow server.
                  You can view your booking details below.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Link
                href={
                  bookingId
                    ? `/dashboard/customer/bookings/${encodeURIComponent(bookingId)}`
                    : "/dashboard/customer"
                }
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl"
              >
                <CalendarCheck size={19} />
                View Booking Details
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/dashboard/customer"
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Go to Customer Dashboard
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-center">
            <p className="text-xs text-slate-500">
              Need help? Contact FixItNow support for assistance.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Thank you for trusting FixItNow.
        </p>
      </div>
    </main>
  );
}
