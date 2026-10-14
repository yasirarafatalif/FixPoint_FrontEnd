
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { getMyPayments } from "@/service/paymentService";

type Payment = {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: number | string;
  status: string;
  gateway?: string | null;
  paymentMethod?: string | null;
  paidAt?: string | Date | null;
  createdAt?: string | Date | null;
};

function formatBDT(amount: number | string) {
  const value = Number(amount);

  return `৳${(Number.isFinite(value) ? value : 0).toLocaleString("en-BD")}`;
}

function formatDate(value?: string | Date | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

function getStatusStyle(status: string) {
  switch (status.toUpperCase()) {
    case "PAID":
      return {
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        label: "Paid",
      };

    case "PENDING":
      return {
        icon: Clock3,
        className: "bg-amber-50 text-amber-700 ring-amber-200",
        label: "Pending",
      };

    case "FAILED":
      return {
        icon: XCircle,
        className: "bg-red-50 text-red-700 ring-red-200",
        label: "Failed",
      };

    case "CANCELLED":
    case "CANCELED":
      return {
        icon: XCircle,
        className: "bg-gray-100 text-gray-700 ring-gray-200",
        label: "Cancelled",
      };

    default:
      return {
        icon: Clock3,
        className: "bg-gray-100 text-gray-700 ring-gray-200",
        label: status || "Unknown",
      };
  }
}

export default async function MyPaymentsPage() {
  const result = await getMyPayments();

  const payments: Payment[] = result.success
    ? result.data
    : [];

  const paidPayments = payments.filter(
    (payment) => payment.status?.toUpperCase() === "PAID",
  );

  const totalPaid = paidPayments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/customer"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Customer Dashboard
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <ReceiptText size={25} />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                My Payments
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                View your transactions and payment history in one place.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              <ShieldCheck size={18} className="text-emerald-600" />
              Secure payment history
            </div>
          </div>
        </div>

        {/* Error */}
        {!result.success && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {result.message}
          </div>
        )}

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Paid
              </p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-gray-900">
              {formatBDT(totalPaid)}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Sum of confirmed paid transactions
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Transactions
              </p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <CreditCard size={21} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-gray-900">
              {payments.length}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Total payment records
            </p>
          </div>
        </div>

        {/* Payment list */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Transaction History
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your recent payment records
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {payments.length} records
            </span>
          </div>

          {!result.success ? null : payments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <ReceiptText size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No payments yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Your payment transactions will appear here after you start
                paying for your FixItNow bookings.
              </p>

              <Link
                href="/dashboard/customer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                View My Bookings
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {payments.map((payment) => {
                const status = getStatusStyle(payment.status);
                const StatusIcon = status.icon;

                return (
                  <article
                    key={payment.id}
                    className="p-5 transition hover:bg-slate-50/70 sm:px-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                          <CreditCard size={21} />
                        </div>

                        <div className="min-w-0">
                          <p className="break-all text-sm font-bold text-gray-900">
                            {payment.transactionId || "Transaction ID unavailable"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Booking: {payment.bookingId || "Not available"}
                          </p>

                          <p className="mt-2 text-xs text-gray-500">
                            {payment.paymentMethod || payment.gateway || "Payment gateway"}
                            {" · "}
                            {formatDate(payment.paidAt || payment.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <p className="text-lg font-extrabold text-gray-900">
                          {formatBDT(payment.amount)}
                        </p>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${status.className}`}
                        >
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {payment.bookingId && (
                      <div className="mt-4 border-t border-gray-100 pt-3">
                        <Link
                          href={`/dashboard/customer/bookings/${encodeURIComponent(payment.bookingId)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                        >
                          View Booking
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          Your payment status is based on records returned by FixItNow.
        </p>
      </div>
    </main>
  );
}
