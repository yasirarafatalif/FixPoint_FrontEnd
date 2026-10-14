
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import {
  SectionTitle,
  StatusBadge,
} from "./BookingDetailsPrimitives";

import type { BookingDetailsData } from "./bookingDetails.types";

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function PaymentSummary({
  booking,
  bookingId,
}: {
  booking: BookingDetailsData;
  bookingId: string;
}) {
    console.log(booking)
  const status = (booking.status || "").toUpperCase();
  const paymentStatus = (booking.paymentStatus || "UNKNOWN").toUpperCase();

  const isCancelled = ["CANCELLED", "CANCELED"].includes(status);
  const isRequested = status === "REQUESTED";
  const isAccepted = status === "ACCEPTED";
  const isCompleted = status === "COMPLETED";
  const isPaid = paymentStatus === "PAID";

  // Only ACCEPTED bookings with unpaid payment can pay.
  const canPay = isAccepted && !isCancelled && !isPaid;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <SectionTitle icon={ReceiptText} title="Payment Summary" />

      <div className="space-y-4 text-sm">
        {/* Service Charge */}
        <div className="flex justify-between gap-3 text-gray-600">
          <span>Service Charge</span>
          <span className="font-medium text-gray-900">
            {formatBDT(booking.pricing.serviceCharge)}
          </span>
        </div>

        {/* Additional Charge */}
        <div className="flex justify-between gap-3 text-gray-600">
          <span>Additional Charge</span>
          <span className="font-medium text-gray-900">
            {formatBDT(booking.pricing.additionalCharge)}
          </span>
        </div>

        {/* Total */}
        <div className="border-t border-dashed border-gray-200 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-900">
              Total Amount
            </span>

            <span className="text-xl font-bold text-gray-900">
              {formatBDT(booking.pricing.total)}
            </span>
          </div>
        </div>

        {/* Booking Status */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-500">Booking Status</span>
          <StatusBadge status={booking.status} />
        </div>

        {/* Payment Status */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-500">Payment Status</span>
          <StatusBadge status={booking.paymentStatus || "UNKNOWN"} />
        </div>

        {/* Payment already completed */}
        {isPaid && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              <CheckCircle2 size={20} />
              Payment Completed
            </div>

            <p className="mt-2 leading-5 text-emerald-700">
              Your payment was successful. Thank you for choosing FixItNow!
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700">
              <ShieldCheck size={15} />
              Payment status confirmed
            </div>
          </div>
        )}

        {/* Booking requested */}
        {!isPaid && isRequested && !isCancelled && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <Clock3 size={20} />
              Waiting for Acceptance
            </div>

            <p className="mt-2 leading-5 text-amber-700">
              Your booking is waiting for acceptance. You can make the
              payment after your booking is accepted by the technician.
            </p>
          </div>
        )}

        {/* Accepted and unpaid */}
        {canPay && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-blue-800">
              <CreditCard size={20} />
              Payment Required
            </div>

            <p className="mt-2 leading-5 text-blue-700">
              Your booking has been accepted. Please complete your payment
              to proceed with the service.
            </p>

            <Link
              href={`/dashboard/customer/bookings/${bookingId}/pay`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Pay Now
              <ArrowUpRight size={17} />
            </Link>
          </div>
        )}

        {/* Completed booking, payment still pending */}
        {!isPaid && isCompleted && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <CheckCircle2 size={20} />
              Service Completed
            </div>

            <p className="mt-2 leading-5 text-gray-600">
              This booking is completed. No new payment can be initiated
              from this page.
            </p>
          </div>
        )}

        {/* Cancelled booking */}
        {isCancelled && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-red-800">
              <XCircle size={20} />
              Booking Cancelled
            </div>

            <p className="mt-2 leading-5 text-red-700">
              This booking has been cancelled. Payment is unavailable
              for this booking.
            </p>
          </div>
        )}

        {/* Other booking statuses */}
        {!isPaid &&
          !isRequested &&
          !isAccepted &&
          !isCompleted &&
          !isCancelled && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">
                {paymentStatus === "FAILED"
                  ? "Payment Failed"
                  : paymentStatus === "UNKNOWN"
                    ? "Payment Status Unavailable"
                    : "Payment Information"}
              </p>

              <p className="mt-2 leading-5 text-gray-600">
                {paymentStatus === "FAILED"
                  ? "Your previous payment was unsuccessful. Payment can be initiated when your booking is accepted."
                  : paymentStatus === "UNKNOWN"
                    ? "We could not confirm your payment status. Please refresh or check your payment history."
                    : "Payment is available only after your booking is accepted."}
              </p>
            </div>
          )}
      </div>
    </section>
  );
}
