"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  LockKeyhole,
} from "lucide-react";

import { Service } from "./ServiceCard";

    

interface Props {
  service: Service;
}

export default function ServiceBookingCard({
  service,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const hours = Math.floor(
    service.duration / 60
  );

  const minutes = service.duration % 60;

  const duration =
    hours > 0
      ? `${hours}h${
          minutes ? ` ${minutes}m` : ""
        }`
      : `${minutes}m`;

  const canBook =
    service.isActive &&
    service.technician.isAvailable &&
    Boolean(date) &&
    Boolean(time);

  const handleBooking = () => {
    if (!canBook) return;

    const bookingData = {
      serviceId: service.id,
      technicianId: service.technicianId,
      bookingDate: `${date}T${time}:00`,
      totalPrice: service.price,
      customerNote: "",
    };

    console.log(
      "Booking Data:",
      bookingData
    );

    // এখানে পরে POST /api/bookings করবে
  };

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      
      {/* Price */}
      <div className="border-b border-slate-100 p-6">
        <p className="text-xs font-medium text-slate-400">
          Service Price
        </p>

        <div className="mt-1 flex items-end justify-between gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            ৳
            {service.price.toLocaleString(
              "en-BD"
            )}
          </h2>

          <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Clock3 size={14} />

            {duration}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-950">
          Book This Service
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          Select your preferred date and time.
        </p>

        {!service.isActive && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-600">
            This service is currently
            unavailable.
          </div>
        )}

        {service.isActive &&
          !service.technician.isAvailable && (
            <div className="mt-5 rounded-xl bg-amber-50 p-4 text-xs font-semibold text-amber-700">
              Technician is currently
              unavailable.
            </div>
          )}

        {/* Date */}
        <div className="mt-6">
          <label
            htmlFor="booking-date"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="booking-date"
              type="date"
              value={date}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setDate(e.target.value)
              }
              disabled={!service.isActive}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Time */}
        <div className="mt-4">
          <label
            htmlFor="booking-time"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Select Time
          </label>

          <div className="relative">
            <Clock3
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="booking-time"
              type="time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              disabled={!service.isActive}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Service Fee
            </span>

            <span className="text-sm font-bold text-slate-900">
              ৳
              {service.price.toLocaleString(
                "en-BD"
              )}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Duration
            </span>

            <span className="text-xs font-semibold text-slate-700">
              {duration}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          disabled={!canBook}
          onClick={handleBooking}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          <CalendarDays size={17} />

          {canBook
            ? "Book Now"
            : "Select Date & Time"}
        </button>

        {/* Trust */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="space-y-3">
            <TrustItem text="Secure booking process" />
            <TrustItem text="Professional technician" />
            <TrustItem text="Transparent pricing" />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-[10px] font-medium text-slate-400">
            <LockKeyhole size={13} />

            Your booking information is secure
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
      <CheckCircle2
        size={15}
        className="shrink-0 text-emerald-500"
      />

      {text}
    </div>
  );
}