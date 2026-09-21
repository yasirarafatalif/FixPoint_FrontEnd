"use client";

import type { TechnicianProfile } from "@/types/technician";

import TechnicianStats from "./_components/TechnicianStats";
import TechnicianProfileCard from "./_components/TechnicianProfileCard";
import AvailabilityCard from "./_components/AvailabilityCard";
import RecentBookings from "./_components/RecentBookings";
import { TechnicianBooking } from "@/types/technicianBooking";
import { User } from "@/types/user";

interface Booking {
  id: string;
  serviceName: string;
  customerName: string;
  bookingDate: string;
  amount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";
}

interface Props {
  profile: TechnicianProfile;
  availability: unknown;
  user: User;
  bookings: TechnicianBooking[];
}

export default function TechnicianDashboardClient({
  profile,
  availability,
  user,
  bookings,
}: Props) {
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-violet-600">
          Technician Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Welcome back {user.name.toLocaleUpperCase()} 
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s what&apos;s happening with your technician account.
        </p>
      </div>

      {/* Stats */}
      <TechnicianStats
        isAvailable={profile.isAvailable}
        totalBookings={bookings.length}
        completedJobs={
          bookings.filter(
            (booking) => booking.status === "COMPLETED"
          ).length
        }
        totalEarnings={bookings.reduce(
          (total, booking) =>
            total + booking.totalPrice,
          0
        )}
      />

      {/* Profile + Availability */}
      <div className="grid gap-6 lg:grid-cols-3">

        <TechnicianProfileCard
          user={user}
          profile={profile}
        />

        <AvailabilityCard
          availability={availability}
          isAvailable={profile.isAvailable}
        />

      </div>

      {/* Recent Bookings */}
      <RecentBookings
        bookings={bookings}
      />

    </div>
  );
}