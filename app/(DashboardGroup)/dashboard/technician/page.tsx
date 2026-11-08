import {
  getTechnicianAvailability,
  getTechnicianBookings,
  getTechnicianProfile,
  technicianGetProfile,
} from "@/service/technicianService";

import TechnicianDashboardClient from "./_components/TechnicianDashboardClient";
import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";
export const metadata = {
  title: "FixitNow | Technician Dashboard",
  description: "Technician dashboard for FixPoint",
};

export default async function TechnicianDashboardPage() {

  const profileResult = await getTechnicianProfile();
  const userProfile = await technicianGetProfile();
  const availabilityResult = await getTechnicianAvailability();
  const bookingsResult = await getTechnicianBookings();
  console.log(profileResult)
  console.log(userProfile)
  console.log(availabilityResult)
  console.log(bookingsResult)

  if (
    !profileResult.success ||
    !availabilityResult.success
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center px-4">
  <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
      <UserRound className="h-8 w-8 text-blue-600" />
    </div>

    <h2 className="mt-5 text-xl font-bold text-slate-900">
      Complete Your Technician Profile
    </h2>

    <p className="mt-3 text-sm leading-6 text-slate-500">
      You are almost there! Please complete your profile and set your
      availability to access your technician dashboard and start
      receiving service bookings.
    </p>

    <Link
      href="/dashboard/technician/set-profile"
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      Setup Your Profile
      <ArrowRight size={18} />
    </Link>

    <p className="mt-4 text-xs text-slate-400">
      Complete your setup to unlock your dashboard.
    </p>

  </div>
</div>
    );
  }

  return (
    <TechnicianDashboardClient
      profile={profileResult.data!}
      availability={availabilityResult.data}
      user={userProfile.data!}
      bookings={bookingsResult.data }
    />
  );
}