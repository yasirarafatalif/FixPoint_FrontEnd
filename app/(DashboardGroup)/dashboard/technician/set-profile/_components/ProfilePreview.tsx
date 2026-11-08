import {
  MapPin,
  BriefcaseBusiness,
  Wrench,
  UserRound,
} from "lucide-react";

import type { TechnicianProfile } from "@/types/technician";

export default function ProfilePreview({
  profile,
}: {
  profile: TechnicianProfile;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <UserRound size={23} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Profile Preview
          </h3>
          <p className="text-xs text-slate-500">
            Your professional information
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <BriefcaseBusiness size={17} className="text-blue-600" />
          {profile.experience} Years Experience
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <MapPin size={17} className="text-blue-600" />
          {profile.location || "Your location"}
        </div>

        <p className="text-sm leading-6 text-slate-500">
          {profile.bio || "Your professional bio will appear here."}
        </p>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Wrench size={17} className="text-blue-600" />
            Professional Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400">
                No skills selected yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
