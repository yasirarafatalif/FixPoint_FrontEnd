import {
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import TechnicianCard from "./TechnicianCard";
import BookingCard from "./BookingCard";

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

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({
  service,
}: ServiceDetailsProps) {
  const hours = Math.floor(service.duration / 60);
  const minutes = service.duration % 60;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

          {/* Background */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur">
            <Wrench className="h-12 w-12" />
          </div>

          {/* Status */}
          <div className="absolute left-5 top-5">
            {service.isActive ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active Service
              </span>
            ) : (
              <span className="rounded-full bg-red-500/20 px-4 py-2 text-xs font-bold text-red-300">
                Inactive
              </span>
            )}
          </div>
        </div>

        {/* Title Section */}
        <div className="p-6 sm:p-8">

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* Left */}
            <div>

              <div className="mb-4 flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  Home Service
                </span>

                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  {service.technician.location}
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4 text-blue-500" />

                  {hours > 0 && `${hours}h `}
                  {minutes > 0 && `${minutes}m`}
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {service.title}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
                {service.description}
              </p>

              {/* Quick Features */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-slate-50 p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Verified Service
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Professional service
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Trusted Professional
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Experienced technician
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <Clock3 className="h-5 w-5 text-indigo-500" />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {hours > 0 && `${hours}h `}
                    {minutes > 0 && `${minutes}m`}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Estimated duration
                  </p>
                </div>

              </div>

            </div>

            {/* Booking */}
            <BookingCard service={service} />

          </div>
        </div>
      </div>

      {/* Technician */}
      <div className="mt-8">
        <TechnicianCard
          technician={service.technician}
        />
      </div>

    </section>
  );
}