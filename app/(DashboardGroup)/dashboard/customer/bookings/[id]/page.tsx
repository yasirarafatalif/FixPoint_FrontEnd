"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getCustomerBookingById } from "@/service/bookingService";

import BookingDetailsContent from "./_components/BookingDetailsContent";
import BookingDetailsSkeleton from "./_components/BookingDetailsSkeleton";
import type { BookingDetailsData } from "./_components/bookingDetails.types";

type ApiBooking = {
  id?: string;
  status?: string;
  bookingDate?: string | Date;
  bookingTime?: string;
  createdAt?: string | Date;
  customerNote?: string | null;
  totalPrice?: number | string;

  service?: {
    id?: string;
    title?: string;
    name?: string;
    price?: number | string;
    category?: string | { name?: string } | null;
    categoryName?: string;
  } | null;

  technician?: {
    name?: string;
    profession?: string;
    experience?: string | number;
    rating?: string | number;
  } | null;

  payment?: {
    status?: string;
  } | null;

  payments?:
    | {
        status?: string;
      }[]
    | null;
  paymentStatus?: string | null;

  location?: string | null;
  address?: string | null;
};

function formatDate(value?: string | Date): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

function formatTime(value?: string | Date): string {
  if (!value) return "Time not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Time not available";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });
}

function toAmount(value?: number | string): number {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

function mapBooking(raw: ApiBooking): BookingDetailsData {
  const service = raw.service;

  const total = toAmount(raw.totalPrice ?? service?.price);

  const category = service?.category;

  const categoryName =
    typeof category === "string"
      ? category
      : (category?.name ?? service?.categoryName ?? "Service Booking");

  const paymentStatus =
    raw.paymentStatus ??
    raw.payment?.status ??
    raw.payments?.[0]?.status ??
    "UNKNOWN";

  return {
    serviceName: service?.title ?? service?.name ?? "Service",

    category: categoryName,

    status: raw.status ?? "REQUESTED",

    bookingDate: formatDate(raw.bookingDate),

    bookingTime: raw.bookingTime
      ? raw.bookingTime
      : formatTime(raw.bookingDate),

    createdAt: formatDate(raw.createdAt),

    customerNote: raw.customerNote ?? "",

    location: raw.location ?? raw.address ?? "Location not available",

    technician: {
      name: raw.technician?.name ?? "Not assigned",
      profession: raw.technician?.profession ?? "Technician",
      experience: raw.technician?.experience
        ? `${raw.technician.experience} experience`
        : "Not available",
      rating: raw.technician?.rating ?? "—",
    },

    pricing: {
      serviceCharge: toAmount(service?.price ?? raw.totalPrice),
      additionalCharge: Math.max(
        0,
        total - toAmount(service?.price ?? raw.totalPrice),
      ),
      total,
    },

    paymentStatus,
  };
}

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const bookingId = params.id;

  const [booking, setBooking] = useState<BookingDetailsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBooking = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getCustomerBookingById(bookingId);

      if (!result.success || !result.data) {
        setBooking(null);
        setError(result.message || "Unable to load booking details.");
        return;
      }

      setBooking(mapBooking(result.data as ApiBooking));
    } catch (err) {
      console.error("Booking details page error:", err);

      setBooking(null);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingId) {
      void loadBooking();
    }
  }, [bookingId, loadBooking]);

  if (loading) {
    return <BookingDetailsSkeleton />;
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            Unable to Load Booking
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error || "Booking not found."}
          </p>

          <button
            type="button"
            onClick={() => void loadBooking()}
            className="mt-6 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return <BookingDetailsContent booking={booking} bookingId={bookingId} />;
}
