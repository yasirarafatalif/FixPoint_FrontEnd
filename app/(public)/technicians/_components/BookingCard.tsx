"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Wrench,
} from "lucide-react";

interface Technician {
  id: string;

  isAvailable?: boolean;

  services?: {
    id: string;
    title: string;
    price: number;
    duration: number;
    isActive: boolean;
  }[];
}

export default function BookingCard({
  technician,
}: {
  technician: Technician;
}) {
  const [selectedService, setSelectedService] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const activeServices =
    technician.services?.filter(
      (service) => service.isActive
    ) || [];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const canBook =
    selectedService &&
    selectedDate &&
    selectedTime &&
    technician.isAvailable;

  const handleBooking = () => {
    if (!canBook) return;

    console.log({
      technicianId: technician.id,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
    });

    // পরে এখানে POST /api/bookings হবে
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <CalendarDays className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Booking
          </p>

          <h2 className="text-xl font-black text-slate-900">
            Book this Professional
          </h2>
        </div>
      </div>

      {/* Service */}
      <div className="mt-6">
        <label className="text-sm font-bold text-slate-700">
          Select Service
        </label>

        <select
          value={selectedService}
          onChange={(e) =>
            setSelectedService(e.target.value)
          }
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="">
            Choose a service
          </option>

          {activeServices.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.title} — ৳{service.price}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="mt-5">
        <label className="text-sm font-bold text-slate-700">
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Time Slots */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-blue-500" />

          <label className="text-sm font-bold text-slate-700">
            Available Time
          </label>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <button
              type="button"
              key={time}
              onClick={() =>
                setSelectedTime(time)
              }
              className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                selectedTime === time
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Button */}
      <button
        disabled={!canBook}
        onClick={handleBooking}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        <Wrench className="h-4 w-4" />

        {technician.isAvailable
          ? "Confirm Booking"
          : "Currently Unavailable"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Select your preferred service, date and available time.
      </p>
    </div>
  );
}