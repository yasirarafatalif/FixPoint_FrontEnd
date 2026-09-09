export default function CategorySkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-slate-200/80"
        />
      ))}
    </div>
  );
}