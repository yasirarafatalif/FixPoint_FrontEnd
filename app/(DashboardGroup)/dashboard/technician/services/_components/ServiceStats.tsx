
import {
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Props = {
  total: number;
  active: number;
  inactive: number;
};

const ServiceStats = ({ total, active, inactive }: Props) => {
  const stats = [
    {
      title: "Total Services",
      value: total,
      icon: BriefcaseBusiness,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Services",
      value: active,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Inactive Services",
      value: inactive,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {stat.value.toString().padStart(2, "0")}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${stat.color}`}>
                <Icon size={23} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceStats;
