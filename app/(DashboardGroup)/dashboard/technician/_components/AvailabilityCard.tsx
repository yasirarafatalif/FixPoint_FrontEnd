import {
  CalendarCheck,
  Clock3,
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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
              isAvailable
                ? "bg-emerald-500"
                : "bg-slate-400"
            }`}
          />

          {isAvailable
            ? "Available"
            : "Unavailable"}

        </span>

      </div>

      {/* Availability Schedule */}
      {Boolean(availability) && (
        <div className="mt-6 space-y-4">

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Monday
            </span>

            <span className="text-sm font-medium text-slate-700">
              09:00 - 17:00
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Tuesday
            </span>

            <span className="text-sm font-medium text-slate-700">
              09:00 - 17:00
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Wednesday
            </span>

            <span className="text-sm font-medium text-slate-700">
              09:00 - 17:00
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Thursday
            </span>

            <span className="text-sm font-medium text-slate-700">
              09:00 - 17:00
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Friday
            </span>

            <span className="text-sm font-medium text-slate-700">
              09:00 - 17:00
            </span>
          </div>

        </div>
      )}

      {/* Manage */}
      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Manage Availability
      </button>

    </div>
  );
}