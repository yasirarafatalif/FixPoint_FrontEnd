import { CustomerBooking } from "@/types/customerBooking";

export function getServiceName(booking: CustomerBooking) {
  return (
    booking.service?.title ??
    booking.service?.name ??
    booking.services?.title ??
    booking.services?.name ??
    "Service"
  );
}

export function getBookingDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getBookingTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getPaymentStatus(booking: CustomerBooking) {
  return (
    booking.payment?.status ??
    booking.payments?.status ??
    ""
  ).toUpperCase();
}