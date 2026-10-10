import { getTechnicianBookings } from "@/service/technicianService";

import TechnicianBookingsClient from "./TechnicianBookingsClient";

export default async function TechnicianBookingsPage() {
  const bookingsResult = await getTechnicianBookings();


  if (!bookingsResult.success) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Failed to load bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {bookingsResult.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TechnicianBookingsClient
      bookings={bookingsResult.data ?? []}
    />
  );
}