import { getTechnicianBookings } from "@/service/technicianService";

import TechnicianBookingsClient from "./_components/TechnicianBookingsClient";
export const metadata = {
  title: "Technician Bookings",
  description: "Manage your bookings as a technician.",
};

export default async function TechnicianBookingsPage() {
  const bookingsResult = await getTechnicianBookings();

  return (
    <TechnicianBookingsClient
      bookings={bookingsResult.data ?? []}
    />
  );
}