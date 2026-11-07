
"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  ReceiptText,
  Search,
  ShieldCheck,
  XCircle,
  RefreshCw,
  Wallet,
} from "lucide-react";

import { getMyPayments } from "@/service/paymentService";

export type Payment = {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: number;
  status: string;
  gateway?: string | null;
  paymentMethod?: string | null;
  paidAt?: string | Date | null;
  cardType?: string | null;
  cardIssuer?: string | null;
  cardBrand?: string | null;
};

type Props = {
  initialPayments: Payment[];
  initialError?: string;
};

const filters = ["ALL", "PAID", "PENDING", "FAILED", "CANCELLED"];

function formatBDT(amount: number) {
  return `৳${amount.toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value?: string | Date | null) {
  if (!value) return "Not paid yet";

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
        label: "Paid",
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      };

    case "PENDING":
      return {
        label: "Pending",
        icon: Clock3,
        className: "bg-amber-50 text-amber-700 ring-amber-200",
      };

    case "FAILED":
      return {
        label: "Failed",
        icon: XCircle,
        className: "bg-red-50 text-red-700 ring-red-200",
      };

    case "CANCELLED":
    case "CANCELED":
      return {
        label: "Cancelled",
        icon: XCircle,
        className: "bg-gray-100 text-gray-700 ring-gray-200",
      };

    default:
      return {
        label: status || "Unknown",
        icon: Clock3,
        className: "bg-gray-100 text-gray-700 ring-gray-200",
      };
  }
}

export default function MyPaymentsClient({
  initialPayments,
  initialError = "",
}: Props) {
  const [payments, setPayments] = useState(initialPayments);
  const [error, setError] = useState(initialError);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  const paidPayments = payments.filter(
    (payment) => payment.status?.toUpperCase() === "PAID"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status?.toUpperCase() === "PENDING"
  );

  const totalPaid = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const pendingAmount = pendingPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.transactionId?.toLowerCase().includes(query) ||
        payment.bookingId?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status?.toUpperCase() === statusFilter ||
        (statusFilter === "CANCELLED" &&
          payment.status?.toUpperCase() === "CANCELED");

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const handleRefresh = () => {
    startTransition(async () => {
      const result = await getMyPayments();

      if (result.success) {
        setPayments(result.data as Payment[]);
        setError("");
      } else {
        setError(result.message || "Unable to load payments.");
      }
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <header>
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

              <p className="mt-2 text-sm text-gray-500">
                Manage and track all your FixItNow transactions.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              <ShieldCheck size={18} className="text-emerald-600" />
              Secure payment history
            </div>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-700">{error}</p>

            <button
              onClick={handleRefresh}
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              <RefreshCw size={15} className={isPending ? "animate-spin" : ""} />
              Try Again
            </button>
          </div>
        )}

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total Paid</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Wallet size={21} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-gray-900">
              {formatBDT(totalPaid)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Confirmed paid transactions
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Pending Amount</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Clock3 size={21} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-gray-900">
              {formatBDT(pendingAmount)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Payments awaiting confirmation
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Transactions</p>
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
        </section>

        {/* Transaction History */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="space-y-5 border-b border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Transaction History
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Search and filter your payment records.
                </p>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
              >
                <RefreshCw
                  size={15}
                  className={isPending ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transaction ID or booking ID..."
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter === "ALL"
                      ? "All Status"
                      : filter.charAt(0) + filter.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                Showing {filteredPayments.length} of {payments.length} records
              </span>
              <span>{paidPayments.length} paid</span>
            </div>
          </div>

          {/* Payment List */}
          {filteredPayments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <ReceiptText size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {payments.length === 0
                  ? "No payments yet"
                  : "No matching payments"}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {payments.length === 0
                  ? "Your payment transactions will appear here after you make a payment for a FixItNow booking."
                  : "Try changing your search keyword or status filter."}
              </p>

              {payments.length === 0 ? (
                <Link
                  href="/dashboard/customer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  View My Bookings
                  <ArrowUpRight size={17} />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                  }}
                  className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => {
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

                          <p className="mt-1 break-all text-xs text-gray-500">
                            Booking: {payment.bookingId || "Not available"}
                          </p>

                          <p className="mt-2 text-xs text-gray-500">
                            {payment.paymentMethod ||
                              payment.gateway ||
                              "Payment gateway"}
                            {" · "}
                            {formatDate(payment.paidAt)}
                          </p>

                          {(payment.cardBrand || payment.cardType || payment.cardIssuer) && (
                            <p className="mt-1 text-xs text-gray-400">
                              {[
                                payment.cardBrand,
                                payment.cardType,
                                payment.cardIssuer,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <p className="text-lg font-extrabold text-gray-900">
                          {formatBDT(Number(payment.amount || 0))}
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

        <p className="text-center text-xs leading-5 text-gray-400">
          Your payment status is based on records returned by FixItNow.
        </p>
      </div>
    </main>
  );
}
