import { Technician } from "@/types";

export default function TechnicianCard({ tech }: { tech: Technician }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">
        {tech.avatar ? (
          <img
            src={tech.avatar}
            alt={tech.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          tech.name.charAt(0)
        )}
      </div>
      <div>
        <h4 className="text-base font-semibold text-slate-800">{tech.name}</h4>
        <p className="text-sm text-slate-500">{tech.expertise}</p>
        {tech.rating !== undefined && (
          <p className="mt-1 text-xs font-semibold text-amber-600">
            ★ {tech.rating.toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
}