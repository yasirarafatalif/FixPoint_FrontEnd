
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

import { Service } from "@/types/servicesTypes";

export default function ServiceCard({
  service,
}: {
  service: Service;
}) {
  const { technician } = service;

  const hours = Math.floor(service.duration / 60);
  const minutes = service.duration % 60;

  const formattedDuration =
    hours > 0
      ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
      : `${minutes} min`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10">
      
      {/* =========================================
          TOP VISUAL AREA
      ========================================== */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        
        {/* Decorative Background */}
        <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl transition duration-500 group-hover:scale-125" />

        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top Row */}
        <div className="relative z-10 flex items-start justify-between p-5">
          
          {/* Service Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 shadow-xl transition duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Wrench className="h-7 w-7" />
          </div>

          {/* Availability */}
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ring-1 ${
              service.isActive
                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20"
                : "bg-white/10 text-slate-300 ring-white/10"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                service.isActive
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-slate-400"
              }`}
            />

            {service.isActive
              ? "Service Active"
              : "Currently Unavailable"}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-5 left-6 right-6 z-10">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">
            Home Service
          </p>

          <h3 className="line-clamp-1 text-2xl font-black tracking-tight text-white">
            {service.title}
          </h3>
        </div>
      </div>

      {/* =========================================
          CONTENT
      ========================================== */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Description */}
        <p className="line-clamp-3 min-h-[60px] text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {/* =========================================
            QUICK INFO
        ========================================== */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          
          {/* Duration */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 transition group-hover:bg-white group-hover:shadow-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock3 className="h-4 w-4 text-blue-500" />

              <span className="text-[10px] font-bold uppercase tracking-wider">
                Duration
              </span>
            </div>

            <p className="mt-2 text-sm font-black text-slate-800">
              {formattedDuration}
            </p>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5">
            <div className="flex items-center gap-2 text-blue-400">
              <BadgeCheck className="h-4 w-4 text-blue-500" />

              <span className="text-[10px] font-bold uppercase tracking-wider">
                Starting at
              </span>
            </div>

            <p className="mt-2 text-lg font-black tracking-tight text-blue-600">
              ৳{service.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* =========================================
            TECHNICIAN
        ========================================== */}
        {technician && (
          <div className="mt-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 transition-all duration-300 group-hover:border-blue-100">
            
            <div className="flex gap-3">
              
              {/* Avatar */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <UserRound className="h-6 w-6" />

                {/* Online Indicator */}
                <span
                  className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white ${
                    technician.isAvailable
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Service Provider
                    </p>

                    <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-800">
                      {technician.bio ||
                        "Professional Technician"}
                    </p>
                  </div>

                  {technician.isAvailable && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Available
                    </div>
                  )}
                </div>

                {/* Location + Experience */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                  
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />

                    <span className="max-w-[120px] truncate">
                      {technician.location ||
                        "Location unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-blue-500" />

                    <span>
                      {technician.experience ?? 0}+ years
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            {technician.skills?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                
                {technician.skills
                  .slice(0, 3)
                  .map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}

                {technician.skills.length > 3 && (
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    +{technician.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* =========================================
            FOOTER
        ========================================== */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          
          <div className="flex items-center gap-3">
            
            {/* Details */}
            <Link
              href={`/services/${service.id}`}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              aria-label="View service details"
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>

            {/* Book Button */}
            <Link
              href={`/services/${service.id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 active:translate-y-0 active:scale-[0.98]"
            >
              <Wrench className="h-4 w-4" />

              Book This Service
            </Link>
          </div>

          {/* Small Footer Text */}
          <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
            Secure booking • Trusted professionals
          </p>
        </div>
      </div>
    </article>
  );
}

