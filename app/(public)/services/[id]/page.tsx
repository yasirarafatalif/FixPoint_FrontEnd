import { getSingleService } from "@/service/getSingelService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

import ServiceHero from "../_components/ServiceHero";
import ServiceInfo from "../_components/ServiceInfo";
import TechnicianCard from "../_components/TechnicianCard";
import ServiceFeatures from "../_components/ServiceFeatures";
import ServiceBookingCard from "../_components/ServiceBookingCard";

export interface Technician {
  id: string;
  bio: string;
  experience: number;
  isAvailable: boolean;
  location: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
  categoryId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  technician: Technician;
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch single service data
  const res = await getSingleService(id);
  const serviceData: Service | null = res?.data?.data || res?.data || null;

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16 font-sans">
      {/* --- Breadcrumb Bar --- */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider">
              <Link href="/services" className="hover:text-slate-950 transition-colors flex items-center gap-1.5">
                <ArrowLeft size={14} /> Services
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                {serviceData.title}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded">
              Protocol Ref: {serviceData.id.slice(0, 8)}
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] items-start">
          
          {/* LEFT COLUMN: Service Details */}
          <div className="space-y-8">
            <ServiceHero service={serviceData} />
            <ServiceInfo service={serviceData} />
            
            <ServiceFeatures />
          </div>

          {/* RIGHT COLUMN: Sticky Booking Card */}
          <aside className="lg:sticky lg:top-20 space-y-6">
            {serviceData.technician && (
              <TechnicianCard technician={serviceData.technician} />
            )}
            {/* <ServiceBookingCard service={serviceData} /> */}
          </aside>

        </div>
      </div>
    </main>
  );
}