
import { getCustomerBookingById } from "@/service/bookingService";

import BookingDetailsContent from "./_components/BookingDetailsContent";
import BookingDetailsError from "./_components/BookingDetailsError";

import type { BookingDetailsData } from "./_components/bookingDetails.types";

export const metadata = {
  title: "Booking Details | FixItNow",
  description: "View your service booking details and payment information.",
};

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

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

  if (Number.isNaN(date.getTime())) {
    return "Time not available";
  }

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

  const serviceCharge = toAmount(
    service?.price ?? raw.totalPrice
  );

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

    location:
      raw.location ?? raw.address ?? "Location not available",

    technician: {
      name: raw.technician?.name ?? "Not assigned",
      profession: raw.technician?.profession ?? "Technician",

      experience: raw.technician?.experience
        ? `${raw.technician.experience} experience`
        : "Not available",

      rating: raw.technician?.rating ?? "—",
    },

    pricing: {
      serviceCharge,

      additionalCharge: Math.max(
        0,
        total - serviceCharge
      ),

      total,
    },

    paymentStatus,
  };
}

export default async function BookingDetailsPage({
  params,
}: Props) {
  const { id: bookingId } = await params;
  let result: Awaited<ReturnType<typeof getCustomerBookingById>> | undefined;
  let requestFailed = false;

  try {
    result = await getCustomerBookingById(bookingId);
  } catch (error) {
    console.error("Booking details page error:", error);
    requestFailed = true;
  }

  if (requestFailed) {
    return (
      <BookingDetailsError
        message="Something went wrong. Please try again."
      />
    );
  }

  if (!result?.success || !result.data) {
    return (
      <BookingDetailsError
        message={result?.message || "Unable to load booking details."}
      />
    );
  }

  const booking = mapBooking(result.data as ApiBooking);

  return (
    <BookingDetailsContent
      booking={booking}
      bookingId={bookingId}
    />
  );
}
