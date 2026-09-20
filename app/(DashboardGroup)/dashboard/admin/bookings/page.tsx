import { getAllAdminBookings } from "@/service/adminBookingService";
import BookingsClient from "./BookingsClient";

export default async function AdminBookingsPage() {
  const result = await getAllAdminBookings();

  if (!result.success) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Failed to load bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {result.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <BookingsClient
      bookings={result.data ?? []}
    />
  );
}