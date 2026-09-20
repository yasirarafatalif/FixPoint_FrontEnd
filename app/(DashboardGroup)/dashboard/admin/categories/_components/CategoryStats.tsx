import { Layers3, Tags } from "lucide-react";
import type { AdminCategory } from "@/types/adminCategory";

interface CategoryStatsProps {
  categories: AdminCategory[];
}

export default function CategoryStats({
  categories,
}: CategoryStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">

      {/* Total */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Categories
            </p>

            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              {categories.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Tags size={21} />
          </div>
        </div>
      </div>

      {/* Marketplace */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Marketplace Categories
            </p>

            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              {categories.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Layers3 size={21} />
          </div>
        </div>
      </div>
    </div>
  );
}