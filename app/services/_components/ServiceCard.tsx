"use client";

import Link from "next/link";
import {
  Clock3,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
  technicianId: string;
  isActive: boolean;

  technician: {
    id: string;
    bio: string;
    experience: number;
    isAvailable: boolean;
    location: string;
    skills: string[];
  };
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const hours = Math.floor(service.duration / 60);
  const minutes = service.duration % 60;
  // console.log(service.id);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image / Header */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-110">
          <Wrench className="h-9 w-9" />
        </div>

        {/* Availability */}
        <div className="absolute left-4 top-4">
          {service.technician.isAvailable ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Location */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-blue-500" />
            {service.technician.location}
          </div>

          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
            Service
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {/* Technician */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Technician
              </p>

              <p className="truncate text-sm font-bold text-slate-900">
                {service.technician.bio}
              </p>

              <p className="text-xs text-slate-500">
                {service.technician.experience} years experience
              </p>
            </div>
          </div>

          {/* Skills */}
          {service.technician.skills?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {service.technician.skills
                .slice(0, 3)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Clock3 className="h-4 w-4 text-blue-500" />

          <span>
            {hours > 0 && `${hours}h `}
            {minutes > 0 && `${minutes}m`}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">

          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Starting from
            </p>

            <p className="text-xl font-black text-blue-600">
              ৳{service.price.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/technicians/${service.id}`}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}