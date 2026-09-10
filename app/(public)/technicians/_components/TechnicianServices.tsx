import {
  Clock3,
  Wrench,
} from "lucide-react";

interface TechnicianService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export default function TechnicianServices({
  services,
}: {
  services: TechnicianService[];
}) {
  const activeServices = services.filter(
    (service) => service.isActive
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Services
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            Services Offered
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Wrench className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {activeServices.length > 0 ? (
          activeServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="h-4 w-4 text-blue-500" />
                    {service.duration} minutes
                  </div>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xl font-black text-blue-600">
                    ৳{service.price.toLocaleString()}
                  </p>

                  <p className="text-xs text-slate-400">
                    Starting price
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
            No active services available.
          </div>
        )}
      </div>
    </div>
  );
}