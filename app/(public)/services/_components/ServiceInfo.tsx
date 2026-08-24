import {
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Service } from "./ServiceCard";


interface Props {
  service: Service;
}

export default function ServiceInfo({
  service,
}: Props) {
  const hours = Math.floor(
    service.duration / 60
  );

  const minutes = service.duration % 60;

  const duration =
    hours > 0
      ? `${hours}h${
          minutes ? ` ${minutes}m` : ""
        }`
      : `${minutes}m`;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <InfoCard
        icon={<Clock3 size={19} />}
        label="Duration"
        value={duration}
      />

      <InfoCard
        icon={<Wrench size={19} />}
        label="Service Type"
        value="Professional"
      />

      <InfoCard
        icon={<ShieldCheck size={19} />}
        label="Status"
        value={
          service.isActive
            ? "Available"
            : "Unavailable"
        }
      />
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-medium text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}