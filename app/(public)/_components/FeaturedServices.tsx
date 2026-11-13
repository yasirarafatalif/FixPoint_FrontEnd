
import Link from "next/link";
import {
  Wrench,
  Star,
  ArrowRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type { HomeService } from "./home.types";

interface FeaturedServicesProps {
  services: HomeService[];
}

export default function FeaturedServices({
  services,
}: FeaturedServicesProps) {
  const featuredServices = services.slice(0, 8);

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50/70 py-20">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="container relative mx-auto px-6">

        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles size={14} />
              Popular Services
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Find the Right Service
              <span className="block text-blue-600">
                For Your Needs
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              Explore trusted services from skilled professionals.
              Quality solutions, reliable technicians, and hassle-free
              booking — all in one place.
            </p>
          </div>

          <Link
            href="/services"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-blue-600 md:inline-flex"
          >
            Explore All Services
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Services Grid */}
        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => {
              const id = service.id || service._id;

              const categoryName =
                typeof service.category === "object"
                  ? service.category?.name
                  : service.category || service.categoryName;

              const technicianName =
                service.technician?.user?.name ||
                service.technician?.name ||
                service.technicianName ||
                "Professional Technician";

              return (
                <div
                  key={id || index}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5"
                >
                  {/* Card Icon Area */}
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/50 transition-transform duration-500 group-hover:scale-150" />

                    <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-blue-100/40" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/80 bg-white/80 text-blue-600 shadow-xl shadow-blue-900/5 backdrop-blur-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Wrench size={36} strokeWidth={1.6} />
                    </div>

                    {categoryName && (
                      <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                        {categoryName}
                      </span>
                    )}

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-blue-600 backdrop-blur">
                      <ShieldCheck size={12} />
                      Trusted Service
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5">

                    {/* Rating */}
                    <div className="mb-3 flex min-h-5 items-center gap-1.5">
                      {typeof service.rating === "number" ? (
                        <>
                          <Star
                            size={15}
                            fill="currentColor"
                            className="text-amber-400"
                          />
                          <span className="text-sm font-bold text-slate-800">
                            {service.rating}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({service.reviewCount ?? service.reviews ?? 0} reviews)
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Professional Service
                        </span>
                      )}
                    </div>

                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {service.title || "Untitled Service"}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Wrench size={13} />
                      </span>
                      <span className="line-clamp-1">
                        By {technicianName}
                      </span>
                    </p>

                    <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                      {service.description ||
                        "Get professional assistance from our experienced service providers."}
                    </p>

                    {/* Price and Action */}
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Starting From
                        </p>
                        <p className="text-xl font-extrabold text-slate-900">
                          <span className="mr-0.5 text-sm text-blue-600">৳</span>
                          {service.price ?? 0}
                        </p>
                      </div>

                      <Link
                        href={id ? `/services/${id}` : "/services"}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
                      >
                        Details
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-500">
              <Wrench size={36} strokeWidth={1.5} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No Services Available Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              We are working on bringing you the best professionals.
              Please check back soon!
            </p>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Services
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        {featuredServices.length > 0 && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              View All Services
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
