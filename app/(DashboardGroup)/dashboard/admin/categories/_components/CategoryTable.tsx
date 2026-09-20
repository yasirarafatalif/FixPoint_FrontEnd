"use client";

import {
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Tags,
  Trash2,
} from "lucide-react";

import type { AdminCategory } from "@/types/adminCategory";

interface CategoryTableProps {
  categories: AdminCategory[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Tags
            size={22}
            className="text-slate-400"
          />
        </div>

        <h3 className="font-semibold text-slate-900">
          No categories found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create your first service category to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Category
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Description
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Created
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {categories.map((category) => (
            <tr
              key={category.id}
              className="transition hover:bg-slate-50/70"
            >
              {/* Category */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Tags size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {category.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      ID: {category.id.slice(-8)}
                    </p>
                  </div>
                </div>
              </td>

              {/* Description */}
              <td className="px-5 py-4">
                <p className="max-w-[380px] truncate text-sm text-slate-600">
                  {category.description || "No description"}
                </p>
              </td>

              {/* Created */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CalendarDays size={14} />

                  {new Date(
                    category.createdAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  <button
                    title="Edit category"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    title="Delete category"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>

                  <button
                    title="More"
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}