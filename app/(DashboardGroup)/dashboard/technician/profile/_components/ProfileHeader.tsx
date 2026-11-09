import {
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

import type { UserUpdateProfile } from "@/types/user";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileHeaderProps {
  profile: UserUpdateProfile;
  previewImage: string;
}

export default function ProfileHeader({
  profile,
  previewImage,
}: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600" />

      <div className="px-5 pb-6 md:px-8">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <ProfileAvatar
              image={previewImage}
              name={profile.name || ""}
            />

            <div className="pb-1">
              <h2 className="text-xl font-bold text-slate-900">
                {profile.name || "Technician"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {profile.email}
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profile.status || "ACTIVE"}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <BriefcaseBusiness
              size={16}
              className="text-violet-600"
            />
            Technician
          </span>

          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <ShieldCheck
              size={16}
              className="text-emerald-600"
            />
            Verified account status: {profile.status || "ACTIVE"}
          </span>
        </div>
      </div>
    </div>
  );
}