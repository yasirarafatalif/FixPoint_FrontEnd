
export default function ServiceSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-48 animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

        <div className="flex justify-between pt-4">
          <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />

          <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

