export type Status =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

const statusStyles: Record<Status, string> = {
  REQUESTED: "bg-amber-50 text-amber-700 ring-amber-100",
  ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-100",
  DECLINED: "bg-rose-50 text-rose-700 ring-rose-100",
  PAID: "bg-violet-50 text-violet-700 ring-violet-100",
  IN_PROGRESS: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  COMPLETED: "bg-slate-100 text-slate-700 ring-slate-200",
  CANCELLED: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
