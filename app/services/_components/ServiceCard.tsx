import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Wrench } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  rating: number;
  totalReviews: number;
  image: string;
  technician: {
    id: string;
    name: string;
    image: string;
    experience: number;
  };
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        {service.image ? (
          <Image
            src={service.image || ""}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <Wrench className="w-10 h-10 text-slate-300" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">{service.rating}</span>
            <span className="text-slate-400 text-xs ml-0.5">({service.totalReviews})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5" />
            {service.location}
          </div>
        </div>

        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {service.description}
        </p>

        {/* Technician Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
            {/* {service.technician.image && (
              <Image src={service.technician.image} alt={service.technician.name} fill className="object-cover" />
            )} */}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Technician</p>
            <p className="text-sm font-bold text-slate-900">{service.technician.name}</p>
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-xs text-slate-400 font-medium">Starting at</p>
            <p className="font-black text-blue-600 text-xl">৳{service.price}</p>
          </div>
          <Link href={`/services/${service.technician.id}`}>
            <button className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}