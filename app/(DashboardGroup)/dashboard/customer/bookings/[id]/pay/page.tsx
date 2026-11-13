
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

import PaymentAction from "./_components/PaymentAction";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Complete Payment | FixItNow",
  description: "Securely complete your service booking payment.",
};

export default async function BookingPaymentPage({
  params,
}: Props) {
  const { id: bookingId } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-lg">
        <Link
          href={`/dashboard/customer/bookings/${bookingId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Back to Booking
        </Link>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* Header */}
          <div className="bg-blue-700 px-6 py-8 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <CreditCard size={26} />
            </div>

            <h1 className="text-2xl font-bold">
              Complete Your Payment
            </h1>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Continue to SSLCommerz to pay securely for your booking.
            </p>
          </div>

          <div className="space-y-6 p-6">
            {/* Booking Reference */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Booking Reference
              </p>

              <p className="mt-1 break-all font-semibold text-gray-900">
                {bookingId}
              </p>
            </div>

            {/* Security Information */}
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-emerald-700"
              />

              <div>
                <p className="font-semibold text-emerald-800">
                  Secure Payment
                </p>

                <p className="mt-1 text-sm leading-5 text-emerald-700">
                  You will be redirected to the SSLCommerz payment
                  gateway to complete your transaction.
                </p>
              </div>
            </div>

            {/* Client Payment Action */}
            <PaymentAction bookingId={bookingId} />

            <p className="text-center text-xs leading-5 text-gray-500">
              Your payment will be confirmed after the server
              verifies the transaction.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
