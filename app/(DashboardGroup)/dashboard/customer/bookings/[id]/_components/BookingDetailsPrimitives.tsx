
import type { LucideIcon } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    REQUESTED: "bg-amber-50 text-amber-700 ring-amber-200",
    ACCEPTED: "bg-blue-50 text-blue-700 ring-blue-200",
    IN_PROGRESS: "bg-violet-50 text-violet-700 ring-violet-200",
    COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    CANCELLED: "bg-red-50 text-red-700 ring-red-200",
    CANCELED: "bg-red-50 text-red-700 ring-red-200",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
    PAID: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    FAILED: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ?? "bg-gray-100 text-gray-700 ring-gray-200"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
  );
}
