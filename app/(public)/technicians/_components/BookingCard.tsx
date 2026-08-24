"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  price: number;
  duration: number;
  technicianId: string;

  technician: {
    isAvailable: boolean;
  };
}

interface BookingCardProps {
  service: Service;
}

export default function BookingCard({
  service,
}: BookingCardProps) {
  const [loading, setLoading] = useState(false);

  const hours = Math.floor(
    service.duration / 60
  );

  const minutes = service.duration % 60;

  const handleBooking = async () => {
    try {
      setLoading(true);

      // পরে এখানে booking API call করবে
      console.log("Booking service:", service.id);

    } catch (error) {
      console.error(
        "Booking failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      {/* Price */}
      <div className="rounded-xl bg-white p-5 shadow-sm">

        <p className="text-xs font-medium text-slate-400">
          Service price
        </p>

        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-black text-blue-600">
            ৳{service.price.toLocaleString()}
          </span>

          <span className="mb-1 text-xs text-slate-400">
            starting price
          </span>
        </div>

      </div>

      {/* Info */}
      <div className="mt-4 space-y-3">

        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 className="h-4 w-4 text-blue-500" />
            <span className="text-sm">
              Duration
            </span>
          </div>

          <span className="text-sm font-bold text-slate-900">
            {hours > 0 && `${hours}h `}
            {minutes > 0 && `${minutes}m`}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            <span className="text-sm">
              Booking
            </span>
          </div>

          <span className="text-sm font-bold text-slate-900">
            Flexible
          </span>
        </div>

      </div>

      {/* Book Button */}
      <Button
        onClick={handleBooking}
        disabled={
          loading ||
          !service.technician.isAvailable
        }
        className="mt-5 h-12 w-full rounded-xl bg-blue-600 text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
      >
        {loading
          ? "Processing..."
          : service.technician.isAvailable
            ? "Book This Service"
            : "Technician Unavailable"}
      </Button>

      {/* Safety */}
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-3">

        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

        <p className="text-[11px] leading-5 text-blue-700">
          Your booking is handled securely.
          You can review the booking details
          before confirming.
        </p>

      </div>
    </div>
  );
}