import {
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import type { TechnicianProfile } from "@/types/technician";

interface Props {
  profile: TechnicianProfile;
}

export default function TechnicianProfileCard({
  profile,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-4">

        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <UserRound size={30} />
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {profile.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Technician
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="flex items-center gap-3">
          <Mail
            size={17}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-600">
            {profile.email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Phone
            size={17}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-600">
            {profile.phone}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={17}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-600">
            {profile.location ||
              profile.address ||
              "Not provided"}
          </span>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-900">
            About
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {profile.bio}
          </p>
        </div>
      )}

      {/* Skills */}
      {profile.skills?.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Skills
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}