import {
  CheckCircle2,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

import { Service } from "./ServiceCard";

interface Props {
  technician: Service["technician"];
}

export default function TechnicianCard({
  technician,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      
      {/* Heading */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
          Service Professional
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Technician Information
        </h2>
      </div>

      {/* Profile */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <UserRound size={34} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-slate-950">
              Professional Technician
            </h3>

            {technician.isAvailable && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Available
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {technician.bio}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Wrench size={14} />

              {technician.experience}+
              years experience
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin size={14} />

              {technician.location}
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-7">
        <h3 className="mb-3 text-sm font-bold text-slate-800">
          Skills & Expertise
        </h3>

        <div className="flex flex-wrap gap-2">
          {technician.skills.map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Location */}
      <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <MapPin size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Service Location
          </p>

          <p className="mt-0.5 text-sm font-semibold text-slate-800">
            {technician.location}
          </p>
        </div>
      </div>
    </div>
  );
}