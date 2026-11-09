import type { UserUpdateProfile } from "@/types/user";

interface AccountInformationProps {
  profile: UserUpdateProfile;
}

export default function AccountInformation({
  profile,
}: AccountInformationProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="font-bold text-slate-900">
        Account Information
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-400">
            Account ID
          </p>

          <p className="mt-1 break-all text-sm font-medium text-slate-700">
            {profile.id}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Account Role
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {profile.role || "TECHNICIAN"}
          </p>
        </div>
      </div>
    </div>
  );
}