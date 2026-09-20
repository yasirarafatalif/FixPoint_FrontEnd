"use client";

import { useState } from "react";
import { Plus, Tags } from "lucide-react";
import type { AdminCategory } from "@/types/adminCategory";
import CategoryStats from "./_components/CategoryStats";
import CategoryForm from "./_components/CategoryForm";
import CategoryTable from "./_components/CategoryTable";


interface CategoriesClientProps {
  categories: AdminCategory[];
}

export default function CategoriesClient({
  categories,
}: CategoriesClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Tags size={19} />
            </div>

            <span className="text-sm font-medium text-blue-600">
              Administration
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Service Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage categories for your service marketplace.
          </p>
        </div>

        <button
        //   onClick={() => setShowForm(!showForm)}
        onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={17} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <CategoryStats categories={categories} />

      {/* Create Form */}
      {showForm && (
        <CategoryForm
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
}