
import Link from "next/link";
import {
  Wrench,
  Zap,
  Droplets,
  PaintRoller,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import type { HomeCategoryItem } from "./home.types";

interface HomeCategoriesProps {
  categories: HomeCategoryItem[];
}

const getCategoryStyle = (name: string) => {
  const value = name.toLowerCase();

  if (value.includes("plumb")) {
    return {
      icon: Droplets,
      style: "bg-blue-50 text-blue-600",
    };
  }

  if (value.includes("electric")) {
    return {
      icon: Zap,
      style: "bg-amber-50 text-amber-600",
    };
  }

  if (value.includes("paint")) {
    return {
      icon: PaintRoller,
      style: "bg-purple-50 text-purple-600",
    };
  }

  if (value.includes("clean")) {
    return {
      icon: Sparkles,
      style: "bg-emerald-50 text-emerald-600",
    };
  }

  return {
    icon: Wrench,
    style: "bg-indigo-50 text-indigo-600",
  };
};

export default function HomeCategories({
  categories,
}: HomeCategoriesProps) {
  return (
    <section className="container mx-auto px-6 py-16">

      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Our Services
        </p>

        <h2 className="text-3xl font-bold text-slate-900">
          Explore Categories
        </h2>

        <p className="mt-2 text-slate-500">
          Find the right professional for your needs.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

          {categories.map((category) => {
            const { icon: Icon, style } = getCategoryStyle(
              category.name
            );

            return (
              <Link
                key={category.id}
                href={`/services?category=${encodeURIComponent(category.id)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition group-hover:scale-110 ${style}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="font-semibold text-slate-800 transition group-hover:text-blue-600">
                  {category.name}
                </h3>

                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-400">
                  Explore Services
                  <ArrowUpRight size={13} />
                </div>
              </Link>
            );
          })}

        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <Wrench className="mx-auto mb-3 text-slate-400" size={32} />

          <p className="font-medium text-slate-700">
            No categories available
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Categories will appear here when services are added.
          </p>
        </div>
      )}

    </section>
  );
}
