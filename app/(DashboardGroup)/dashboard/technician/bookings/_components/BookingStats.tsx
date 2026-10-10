import { CalendarCheck, CheckCircle2, Clock3, XCircle } from "lucide-react";

import type { TechnicianBooking } from "@/types/technicianBooking";

interface Props {
  bookings: TechnicianBooking[];
}

export default function BookingStats({ bookings }: Props) {
  const pending = bookings.filter(
(booking) => booking.status === "PENDING",
  ).length;
  const rejected = bookings.filter(
(booking) => booking.status === "DECLINED",
  ).length;
  const requested = bookings.filter(
(booking) => booking.status === "REQUESTED",
  ).length;

  const confirmed = bookings.filter(
    (booking) => booking.status === "ACCEPTED",
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat
        title="Total"
        value={bookings.length}
        icon={CalendarCheck}
        style="bg-blue-50 text-blue-600"
      />

      <Stat
        title="Pending"
        value={requested + pending}
        icon={Clock3}
        style="bg-amber-50 text-amber-600"
      />

      <Stat
        title="Accepted"
        value={confirmed}
        icon={CheckCircle2}
        style="bg-violet-50 text-violet-600"
      />

      <Stat
        title="Completed"
        value={completed}
        icon={CheckCircle2}
        style="bg-emerald-50 text-emerald-600"
      />
    </div>
  );
}

function Stat({ title, value, icon: Icon, style }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${style}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}
