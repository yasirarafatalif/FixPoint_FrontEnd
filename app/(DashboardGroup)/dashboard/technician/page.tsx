import {
  getTechnicianAvailability,
  getTechnicianBookings,
  getTechnicianProfile,
  technicianGetProfile,
} from "@/service/technicianService";

import TechnicianDashboardClient from "./TechnicianDashboardClient";

export default async function TechnicianDashboardPage() {

  const profileResult = await getTechnicianProfile();
  const userProfile = await technicianGetProfile();
  const availabilityResult = await getTechnicianAvailability();
  const bookingsResult = await getTechnicianBookings();
  // console.log(bookingsResult)
  // console.log(availabilityResult)

  if (
    !profileResult.success ||
    !availabilityResult.success ||
    !bookingsResult.success
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">

          <h2 className="text-lg font-semibold text-slate-900">
            Failed to load dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {profileResult.message ||
              availabilityResult.message ||
              bookingsResult.message}
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