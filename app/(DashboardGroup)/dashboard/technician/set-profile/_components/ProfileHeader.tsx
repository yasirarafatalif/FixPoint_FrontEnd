import { UserRound } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <UserRound size={27} />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Complete Your Professional Profile
      </h1>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        Tell customers about your experience, skills, and location
        to start offering your services through FixItNow.
      </p>
    </div>
  );
}