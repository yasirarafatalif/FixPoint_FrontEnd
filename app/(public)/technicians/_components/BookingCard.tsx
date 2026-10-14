
"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Wrench,
  MessageSquareText,
  LoaderCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { createBooking } from "@/service/bookingService";

interface Service {
  id: string;
  title: string;
  price: number;
  duration: number;
  isActive: boolean;
}

interface Technician {
  id: string;
  isAvailable?: boolean;
  services?: Service[];
}

export default function BookingCard({
  technician,
}: {
  technician: Technician;
}) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerNote, setCustomerNote] = useState(
    "Please arrive on time.",
  );
  const [submitting, setSubmitting] = useState(false);

  const activeServices =
    technician.services?.filter((service) => service.isActive) ?? [];

  const selectedServiceData = activeServices.find(
    (service) => service.id === selectedService,
  );

  // Today's date in Bangladesh timezone
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // Hourly slots: 00:00 to 23:00
  const hourlySlots = Array.from(
    { length: 24 },
    (_, hour) => `${String(hour).padStart(2, "0")}:00`,
  );

  const canBook =
    Boolean(selectedService) &&
    Boolean(selectedDate) &&
    Boolean(selectedTime) &&
    Boolean(customerNote.trim()) &&
    technician.isAvailable !== false &&
    !submitting;

  const handleBooking = async () => {
    if (!canBook) return;

    // Prevent past dates and past times today in Bangladesh.
    const nowInDhaka = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
      }),
    );

    const selectedDateTime = new Date(
      `${selectedDate}T${selectedTime}:00+06:00`,
    );

    if (Number.isNaN(selectedDateTime.getTime())) {
      await Swal.fire(
        "Invalid date or time",
        "Please select a valid booking time.",
        "warning",
      );
      return;
    }

    if (selectedDateTime.getTime() <= Date.now()) {
      await Swal.fire(
        "Invalid booking time",
        "Please select a future date and time.",
        "warning",
      );
      return;
    }

    const confirmed = await Swal.fire({
      title: "Confirm Booking?",
      text: `${selectedServiceData?.title} — ৳${selectedServiceData?.price}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Go Back",
      confirmButtonColor: "#2563eb",
    });

    if (!confirmed.isConfirmed) return;

    setSubmitting(true);

    try {
      const result = await createBooking({
        serviceId: selectedService,
        bookingDate: selectedDateTime.toISOString(),
        customerNote: customerNote.trim(),
      });

      if (!result.success) {
        throw new Error(result.message || "Booking failed.");
      }

      await Swal.fire({
        icon: "success",
        title: "Booking Requested!",
        text: result.message || "Your booking request was submitted.",
        confirmButtonColor: "#2563eb",
      });

      setSelectedService("");
      setSelectedDate("");
      setSelectedTime("");
      setCustomerNote("Please arrive on time.");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setSubmitting(false);
    }
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

      {/* Technician status */}
      {technician.isAvailable === false && (
        <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          This technician is currently unavailable.
        </div>
      )}

      {/* Service */}
      <div className="mt-6">
        <label
          htmlFor="booking-service"
          className="text-sm font-bold text-slate-700"
        >
          Select Service
        </label>

        <select
          id="booking-service"
          required
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="">Choose a service</option>

          {activeServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title} — ৳{service.price}
            </option>
          ))}
        </select>

        {activeServices.length === 0 && (
          <p className="mt-2 text-xs text-amber-600">
            No active services are available.
          </p>
        )}
      </div>

      {/* Date */}
      <div className="mt-5">
        <label
          htmlFor="booking-date"
          className="text-sm font-bold text-slate-700"
        >
          Select Date
        </label>

        <input
          id="booking-date"
          type="date"
          required
          min={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Hourly Time Slots */}
      <div className="mt-5">
        <label
          htmlFor="booking-time"
          className="flex items-center gap-2 text-sm font-bold text-slate-700"
        >
          <Clock3 className="h-4 w-4 text-blue-500" />
          Select Time Slot
        </label>

        <select
          id="booking-time"
          required
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
        >
          <option value="">Choose a time</option>

          {hourlySlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <p className="mt-2 text-xs text-slate-400">
          Choose your preferred hourly slot. The server will
          reject a time that is already booked.
        </p>
      </div>

      {/* Customer Note */}
      <div className="mt-5">
        <label
          htmlFor="customer-note"
          className="flex items-center gap-2 text-sm font-bold text-slate-700"
        >
          <MessageSquareText className="h-4 w-4 text-blue-500" />
          Customer Note
        </label>

        <textarea
          id="customer-note"
          required
          rows={3}
          maxLength={500}
          value={customerNote}
          onChange={(e) => setCustomerNote(e.target.value)}
          placeholder="Describe your requirements..."
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Price Summary */}
      {selectedServiceData && (
        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {selectedServiceData.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {selectedServiceData.duration} minutes
            </p>

            {selectedDate && selectedTime && (
              <p className="mt-1 text-xs text-blue-600">
                {selectedDate} at {selectedTime}
              </p>
            )}
          </div>

          <p className="text-xl font-black text-slate-900">
            ৳{selectedServiceData.price}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        disabled={!canBook}
        onClick={handleBooking}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {submitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Wrench className="h-4 w-4" />
        )}

        {submitting
          ? "Creating Booking..."
          : technician.isAvailable === false
            ? "Currently Unavailable"
            : "Submit Booking Request"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Your booking will be checked against existing bookings
        before it is saved.
      </p>
    </div>
  );
}
