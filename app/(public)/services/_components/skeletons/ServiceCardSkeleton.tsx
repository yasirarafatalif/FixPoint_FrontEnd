export default function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-md">
      <div className="h-44 w-full animate-pulse rounded-xl bg-slate-200/80" />
      <div className="h-5 w-3/4 animate-pulse rounded-md bg-slate-200/80" />
      <div className="h-4 w-full animate-pulse rounded-md bg-slate-200/60" />
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200/80" />
        <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200/80" />
      </div>
    </div>
  );
}