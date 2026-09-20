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

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarCheck size={19} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            Availability
          </h2>

          <p className="text-xs text-slate-500">
            Your current availability
          </p>
        </div>
      </div>

      <div className="mt-6">
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

      {Boolean(availability) && (
        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <Clock3
              size={17}
              className="text-slate-400"
            />

            <span className="text-sm text-slate-600">
              Availability schedule
            </span>
          </div>

        </div>
      )}
    </div>
  );
}