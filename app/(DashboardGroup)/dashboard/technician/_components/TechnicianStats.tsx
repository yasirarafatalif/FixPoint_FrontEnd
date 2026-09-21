import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Wallet,
} from "lucide-react";

interface Props {
  isAvailable: boolean;
  totalBookings: number;
  completedJobs: number;
  totalEarnings: number;
}

export default function TechnicianStats({
  isAvailable,
  totalBookings,
  completedJobs,
  totalEarnings,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* Availability */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CalendarCheck size={20} />
          </div>

          <span className="text-xs font-medium text-slate-400">
            Status
          </span>

        </div>

        <p className="mt-5 text-sm text-slate-500">
          Availability
        </p>

        <h3
          className={`mt-1 text-xl font-bold ${
            isAvailable
              ? "text-emerald-600"
              : "text-slate-700"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </h3>

      </div>

      {/* Total Bookings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ClipboardList size={20} />
          </div>

          <span className="text-xs font-medium text-slate-400">
            All Time
          </span>

        </div>

        <p className="mt-5 text-sm text-slate-500">
          Total Bookings
        </p>

        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          {totalBookings}
        </h3>

      </div>

      {/* Completed Jobs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <CheckCircle2 size={20} />
          </div>

          <span className="text-xs font-medium text-slate-400">
            Completed
          </span>

        </div>

        <p className="mt-5 text-sm text-slate-500">
          Completed Jobs
        </p>

        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          {completedJobs}
        </h3>

      </div>

      {/* Total Earnings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Wallet size={20} />
          </div>

          <span className="text-xs font-medium text-slate-400">
            All Time
          </span>

        </div>

        <p className="mt-5 text-sm text-slate-500">
          Total Earnings
        </p>

        <h3 className="mt-1 text-2xl font-bold text-slate-900">
          ৳{totalEarnings.toLocaleString()}
        </h3>

      </div>

    </div>
  );
}