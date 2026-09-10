"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

import BookingCard from "./BookingCard";
import TechnicianServices from "./TechnicianServices";

interface Technician {
  id: string;
  bio?: string;
  experience?: number;
  location?: string;
  skills?: string[];
  isAvailable?: boolean;

  user?: {
    name?: string;
    email?: string;
  };

  services?: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    isActive: boolean;
  }[];
}

export default function TechnicianProfileClient({
  technician,
}: {
  technician: Technician;
}) {
  const technicianName =
    technician.user?.name || "Professional Technician";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Profile */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-[30px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl shadow-blue-500/20">
                <UserRound className="h-14 w-14" />

                <span
                  className={`absolute -bottom-2 -right-2 h-7 w-7 rounded-full border-4 border-slate-950 ${
                    technician.isAvailable
                      ? "bg-emerald-500"
                      : "bg-slate-500"
                  }`}
                />
              </div>

              {/* Details */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {technicianName}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-400/20">
                    <BadgeCheck className="h-4 w-4" />
                    Verified Professional
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                  {technician.bio ||
                    "Experienced professional providing reliable home services."}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    {technician.location || "Location unavailable"}
                  </div>

                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-blue-400" />
                    {technician.experience ?? 0}+ Years Experience
                  </div>

                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      technician.isAvailable
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />

                    {technician.isAvailable
                      ? "Available for booking"
                      : "Currently unavailable"}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* About */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    About
                  </p>

                  <h2 className="text-xl font-black text-slate-900">
                    About the Professional
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-7 text-slate-600">
                {technician.bio ||
                  "No detailed biography has been provided yet."}
              </p>
            </div>

            {/* Skills */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Wrench className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                    Expertise
                  </p>

                  <h2 className="text-xl font-black text-slate-900">
                    Professional Skills
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {technician.skills?.length ? (
                  technician.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No skills added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Services */}
            <TechnicianServices
              services={technician.services || []}
            />

            {/* Trust */}
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-black text-slate-900">
                    Book with confidence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose a service, select your preferred date and
                    available time, then confirm your booking securely.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT BOOKING CARD */}
          <aside>
            <BookingCard
              technician={technician}
            />
          </aside>

        </div>
      </section>
    </main>
  );
}