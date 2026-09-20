import {
  BriefcaseBusiness,
  CheckCircle2,
  Wrench,
} from "lucide-react";

import type { TechnicianProfile } from "@/types/technician";

interface Props {
  profile: TechnicianProfile;
}

export default function TechnicianStats({
  profile,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Experience
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          {profile.experience}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Years
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Skills
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          {profile.skills?.length ?? 0}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Listed skills
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Availability
        </p>

        <h3 className="mt-2 text-lg font-bold text-slate-900">
          {profile.isAvailable
            ? "Available"
            : "Unavailable"}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Current status
        </p>
      </div>

    </div>
  );
}