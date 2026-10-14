
import Link from "next/link";
import {
  XCircle,
  ArrowLeft,
  RefreshCw,
  CreditCard,
  Home,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  const bookingUrl = bookingId
    ? `/dashboard/customer/bookings/${encodeURIComponent(bookingId)}`
    : "/dashboard/customer";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

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

        {/* Cancel card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
          <div className="px-6 pb-8 pt-10 text-center sm:px-10">
            {/* Cancel icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/60">
              <XCircle
                size={54}
                strokeWidth={1.8}
                className="text-amber-500"
              />
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Payment Cancelled
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              No worries!
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
              You cancelled the payment process. No successful payment has
              been confirmed by this page. You can return to your booking
              whenever you are ready.
            </p>

            {/* Booking reference */}
            {bookingId && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
                    <CreditCard size={21} />
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

            {/* Information */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-left">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-blue-700"
              />
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Your booking is still available
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  If you still want the service, return to your booking and
                  check its current payment status before trying again.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Link
                href={bookingUrl}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl"
              >
                <RefreshCw size={18} />
                Return to Booking
              </Link>

              <Link
                href="/dashboard/customer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
                Customer Dashboard
              </Link>
            </div>

            {/* Support */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Headphones size={15} />
              Need help? Contact FixItNow support.
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-center">
            <p className="text-xs text-slate-500">
              We’ll be here whenever you’re ready.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          FixItNow · Home services made easier.
        </p>
      </div>
    </main>
  );
}
