
"use client";

import {
  LayoutGrid,
  ArrowUpDown,
  Activity,
  UserRoundCheck,
  RotateCcw,
} from "lucide-react";

interface Category {
  id?: string;
  _id?: string;
  categoryId?: string;
  name: string;
}

interface ServiceFiltersProps {
  categories: Category[];
  selectedCategoryId: string;
  setSelectedCategoryId: (value: string) => void;
  serviceStatus: "all" | "active" | "inactive";
  setServiceStatus: (value: "all" | "active" | "inactive") => void;
  techAvailability: "all" | "available" | "busy";
  setTechAvailability: (value: "all" | "available" | "busy") => void;
  priceSort: "default" | "lowToHigh" | "highToLow";
  setPriceSort: (value: "default" | "lowToHigh" | "highToLow") => void;
  onReset: () => void;
}

export default function ServiceFilters({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  serviceStatus,
  setServiceStatus,
  techAvailability,
  setTechAvailability,
  priceSort,
  setPriceSort,
  onReset,
}: ServiceFiltersProps) {
  const getCatId = (cat: Category): string =>
    String(cat.id || cat._id || cat.categoryId || "").trim();

  const selectClass =
    "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-3 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50";

  const labelClass =
    "mb-2 flex items-center gap-2 text-xs font-semibold text-slate-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="text-sm font-bold text-slate-800">
          Filter Services
        </h3>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
        >
          <RotateCcw size={14} />
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Category */}
        <div>
          <label className={labelClass}>
            <LayoutGrid size={15} className="text-slate-400" />
            Category
          </label>

          <div className="relative">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Categories</option>
              {categories.map((cat, index) => {
                const catId = getCatId(cat);

                return (
                  <option key={catId || index} value={catId}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className={labelClass}>
            <ArrowUpDown size={15} className="text-slate-400" />
            Sort By Price
          </label>

          <div className="relative">
            <select
              value={priceSort}
              onChange={(e) =>
                setPriceSort(
                  e.target.value as "default" | "lowToHigh" | "highToLow"
                )
              }
              className={selectClass}
            >
              <option value="default">Default Order</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Service Status */}
        <div>
          <label className={labelClass}>
            <Activity size={15} className="text-slate-400" />
            Service Status
          </label>

          <div className="relative">
            <select
              value={serviceStatus}
              onChange={(e) =>
                setServiceStatus(
                  e.target.value as "all" | "active" | "inactive"
                )
              }
              className={selectClass}
            >
              <option value="all">All Services</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Technician */}
        <div>
          <label className={labelClass}>
            <UserRoundCheck size={15} className="text-slate-400" />
            Technician Status
          </label>

          <div className="relative">
            <select
              value={techAvailability}
              onChange={(e) =>
                setTechAvailability(
                  e.target.value as "all" | "available" | "busy"
                )
              }
              className={selectClass}
            >
              <option value="all">All Technicians</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy / Unavailable</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
