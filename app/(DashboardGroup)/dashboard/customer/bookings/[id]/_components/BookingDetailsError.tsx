
"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, AlertCircle } from "lucide-react";

interface BookingDetailsErrorProps {
  message: string;
}

export default function BookingDetailsError({
  message,
}: BookingDetailsErrorProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-xl font-bold text-gray-900">
          Unable to Load Booking
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {message}
        </p>

        <button
          type="button"
          onClick={() => router.refresh()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </main>
  );
}
