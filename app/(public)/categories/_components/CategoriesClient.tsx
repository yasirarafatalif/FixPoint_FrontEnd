
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
  Snowflake,
  Sparkles,
  Hammer,
  Home,
  ShieldCheck,
  LayoutGrid,
  X,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  description?: string | null;
};

interface CategoriesClientProps {
  categories: unknown;
}

const getCategoriesArray = (value: unknown): Category[] => {
  if (Array.isArray(value)) return value;

  if (value && typeof value === "object") {
    const response = value as Record<string, unknown>;

    if (Array.isArray(response.data)) {
      return response.data as Category[];
    }

    if (Array.isArray(response.categories)) {
      return response.categories as Category[];
    }

    if (response.data && typeof response.data === "object") {
      return getCategoriesArray(response.data);
    }
  }

  return [];
};

const categoryStyles = [
  {
    icon: Droplets,
    color: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600",
  },
  {
    icon: Snowflake,
    color: "bg-cyan-50 text-cyan-600",
    hover: "group-hover:bg-cyan-600",
  },
  {
    icon: Paintbrush,
    color: "bg-purple-50 text-purple-600",
    hover: "group-hover:bg-purple-600",
  },
  {
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    hover: "group-hover:bg-amber-500",
  },
  {
    icon: Wrench,
    color: "bg-emerald-50 text-emerald-600",
    hover: "group-hover:bg-emerald-600",
  },
  {
    icon: Sparkles,
    color: "bg-pink-50 text-pink-600",
    hover: "group-hover:bg-pink-600",
  },
  {
    icon: Hammer,
    color: "bg-orange-50 text-orange-600",
    hover: "group-hover:bg-orange-600",
  },
  {
    icon: Home,
    color: "bg-indigo-50 text-indigo-600",
    hover: "group-hover:bg-indigo-600",
  },
  {
    icon: ShieldCheck,
    color: "bg-teal-50 text-teal-600",
    hover: "group-hover:bg-teal-600",
  },
];

export default function CategoriesClient({
  categories: categoriesResponse,
}: CategoriesClientProps) {
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => getCategoriesArray(categoriesResponse),
    [categoriesResponse]
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const query = search.toLowerCase();

      return (
        category.name?.toLowerCase().includes(query) ||
        category.description?.toLowerCase().includes(query)
      );
    });
  }, [categories, search]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <LayoutGrid size={16} />
            Our Service Categories
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Explore Our{" "}
            <span className="text-blue-600">Services</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            From everyday repairs to essential home improvements,
            find the right professional service for all your needs.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-lg">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a service category..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Category Count */}
        <div className="mt-12 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Browse Categories
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find the perfect service for your needs.
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {filteredCategories.length} Categories
          </span>
        </div>

        {/* Category Cards */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category, index) => {
              const style = categoryStyles[index % categoryStyles.length];
              const Icon = style.icon;

              return (
                <Link
                  key={category.id}
                  href={`/services?categoryId=${encodeURIComponent(category.id)}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${style.color} ${style.hover} group-hover:text-white`}
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                      {category.name}
                    </h3>

                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                      {category.description ||
                        `Explore our ${category.name.toLowerCase()} services and find the right professional for your needs.`}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-sm font-semibold text-blue-600">
                      Explore Services
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>

                  {/* Decorative */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
            <Search className="mx-auto text-slate-400" size={35} />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different category name.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-5 font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
