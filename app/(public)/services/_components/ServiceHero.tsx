import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Wrench,
} from "lucide-react";

import { Service } from "./ServiceCard";


interface Props {
  service: Service;
}

export default function ServiceHero({
  service,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      
      {/* HERO */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-950 sm:h-80">
        
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-blue-400 backdrop-blur-md sm:h-32 sm:w-32">
          <Wrench size={56} strokeWidth={1.5} />
        </div>

        {/* STATUS */}
        <div className="absolute right-5 top-5">
          {service.isActive ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
              <CheckCircle2 size={13} />
              Active
            </span>
          ) : (
            <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
              Inactive
            </span>
          )}
        </div>

        <div className="absolute bottom-5 left-5">
          <Link
            href="/services"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
          >
            <ArrowLeft size={13} />
            Back to Services
          </Link>
        </div>
      </div>

      {/* TITLE */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
            Home Service
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            #{service.id.slice(0, 8)}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {service.title}
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
          {service.description}
        </p>
      </div>
    </div>
  );
}