
"use client";

import { useState } from "react";
import { CreditCard, LoaderCircle } from "lucide-react";

import { createPayment } from "@/service/paymentService";

interface PaymentActionProps {
  bookingId: string;
}

export default function PaymentAction({
  bookingId,
}: PaymentActionProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!bookingId || loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await createPayment(bookingId);

      if (!result.success || !result.paymentUrl) {
        setError(result.message || "Unable to start payment.");
        return;
      }

      window.location.assign(result.paymentUrl);
    } catch (err) {
      console.error("Payment initiation error:", err);

      setError(
        "Unable to connect to the payment service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || !bookingId}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle
              size={19}
              className="animate-spin"
            />
            Redirecting to Payment...
          </>
        ) : (
          <>
            <CreditCard size={19} />
            Continue to Payment
          </>
        )}
      </button>
    </div>
  );
}
