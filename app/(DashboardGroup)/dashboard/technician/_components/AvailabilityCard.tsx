
import Link from "next/link";
import {
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  availability: unknown;
  isAvailable: boolean;
}

export default function AvailabilityCard({
  availability,
  isAvailable,
}: Props) {
  return (
    <Link
      href="/dashboard/technician/availability"
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
            <CalendarCheck size={19} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Availability
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your current working schedule
            </p>
          </div>
        </div>

        <ArrowUpRight
          size={19}
          className="text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
        />
      </div>

      {/* Status */}
      <div className="mt-5">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
            isAvailable
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />

          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Schedule Preview */}
      {Boolean(availability) && (
        <div className="mt-6 space-y-4">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ].map((day) => (
            <div
              key={day}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-slate-500">
                {day}
              </span>

              <span className="text-sm font-medium text-slate-700">
                09:00 - 17:00
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Manage Availability */}
      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-600">
        Manage Availability
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}
