"use client";

import type { TechnicianProfile } from "@/types/technician";

import TechnicianProfileCard from "./_components/TechnicianProfileCard";
import AvailabilityCard from "./_components/AvailabilityCard";
import TechnicianStats from "./_components/TechnicianStats";

interface TechnicianDashboardClientProps {
  profile: TechnicianProfile | null;
  availability: unknown;
}

export default function TechnicianDashboardClient({
  profile,
  availability,
}: TechnicianDashboardClientProps) {
  if (!profile) {
    return null;
  }

  console.log(availability)

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-violet-600">
          Technician Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {profile.name}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile and availability.
        </p>
      </div>

      {/* Stats */}
      <TechnicianStats
        profile={profile}
      />

      {/* Main */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <TechnicianProfileCard
            profile={profile}
          />
        </div>

        <div>
          <AvailabilityCard
            availability={availability}
            isAvailable={profile.isAvailable}
          />
        </div>

      </div>
    </div>
  );
}