export default function TechnicianCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-md">
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-slate-200/80" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-1/2 animate-pulse rounded-md bg-slate-200/80" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-slate-200/60" />
      </div>
    </div>
  );
}