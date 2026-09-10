export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-80 animate-pulse bg-slate-900" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
        </div>

        <div className="h-[500px] animate-pulse rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}