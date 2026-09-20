import {
  getTechnicianAvailability,
  getTechnicianBookings,
  getTechnicianProfile,
  technicianGetProfile,
} from "@/service/technicianService";

import TechnicianDashboardClient from "./TechnicianDashboardClient";

export default async function TechnicianDashboardPage() {
  // const [profileResult, availabilityResult] =
  //   await Promise.all([
  //     getTechnicianProfile(),
  //     getTechnicianAvailability(),
  //   ]);

  // if (
  //   !profileResult.success ||
  //   !availabilityResult.success
  // ) {
  //   return (
  //     <div className="flex min-h-[500px] items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-lg font-semibold text-slate-900">
  //           Failed to load dashboard
  //         </h2>

  //         <p className="mt-1 text-sm text-slate-500">
  //           {profileResult.message ||
  //             availabilityResult.message}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  const profileResult = await getTechnicianProfile();
  const availabilityResult = await getTechnicianAvailability();

  const bookingsResult = await getTechnicianBookings();
  console.log(bookingsResult)
  const profile = technicianGetProfile();
  console.log(profile)
  return (
    <TechnicianDashboardClient
      profile={profileResult.data}
      availability={availabilityResult.data}
    />
  );
}