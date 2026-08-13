import {
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  UserRound,
} from "lucide-react";

interface Technician {
  id: string;
  bio: string;
  experience: number;
  isAvailable: boolean;
  location: string;
  skills: string[];
}

interface TechnicianCardProps {
  technician: Technician;
}

export default function TechnicianCard({
  technician,
}: TechnicianCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-semibold text-blue-600">
            YOUR PROFESSIONAL
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Technician Information
          </h2>
        </div>

        {technician.isAvailable ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available Now
          </span>
        ) : (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Currently Unavailable
          </span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

        {/* Profile */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
            <UserRound className="h-10 w-10" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            {technician.bio}
          </h3>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-blue-500" />
            {technician.location}
          </div>

        </div>

        {/* Information */}
        <div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* Experience */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Experience
                  </p>

                  <p className="text-lg font-black text-slate-900">
                    {technician.experience} Years
                  </p>
                </div>
              </div>

            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <p className="text-lg font-black text-slate-900">
                    {technician.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Skills */}
          <div className="mt-6">

            <h3 className="mb-3 text-sm font-bold text-slate-900">
              Skills & Expertise
            </h3>

            <div className="flex flex-wrap gap-2">
              {technician.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}