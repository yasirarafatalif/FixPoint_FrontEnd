import {
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import type { TechnicianProfile } from "@/types/technician";
import { User } from "@/types/user";

interface Props {
  profile: TechnicianProfile;
  user: User;
}

export default function TechnicianProfileCard({
  profile,
  user,
}: Props) {
  console.log(user)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

      {/* Profile Header */}
      <div className="flex items-center gap-4">

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
            {user.name.toLocaleUpperCase()}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {user.role || "Technician"}
          </p>
        </div>

      </div>

      {/* Contact */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="flex items-center gap-3">
          <Mail size={17} className="text-slate-400" />

          <span className="text-sm text-slate-600">
            {user.email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={17} className="text-slate-400" />

          <span className="text-sm text-slate-600">
            {user.phone}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={17} className="text-slate-400" />

          <span className="text-sm text-slate-600">
            {profile.location ||
              profile.address ||
              "Not provided"}
          </span>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Experience
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {profile.experience} Years
          </p>
        </div>

      </div>

      {/* About */}
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