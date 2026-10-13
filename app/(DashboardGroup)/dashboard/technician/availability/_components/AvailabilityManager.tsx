
"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Save,
  LoaderCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { updateTechnicianAvailability } from "@/service/technicianService";

const DAYS = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
] as const;

type Day = (typeof DAYS)[number]["value"];

export default function AvailabilityForm() {
  const [formData, setFormData] = useState({
    day: "MONDAY" as Day,
    startTime: "09:00",
    endTime: "17:00",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.startTime >= formData.endTime) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Working Hours",
        text: "End time must be after start time.",
      });
      return;
    }

    setSaving(true);

    try {
        console.log(formData)
      const result = await updateTechnicianAvailability(formData);

      if (!result.success) {
        throw new Error(result.message || "Failed to update availability");
      }

      await Swal.fire({
        icon: "success",
        title: "Availability Updated!",
        text: "Your working schedule has been updated successfully.",
        confirmButtonColor: "#059669",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <CalendarDays size={19} />
            Technician Dashboard
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Availability Management
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Update your working day and service hours.
          </p>
        </div>

        {/* Schedule summary */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-medium text-emerald-50">
            YOUR WORKING SCHEDULE
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {DAYS.find((d) => d.value === formData.day)?.label}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2">
              <Clock3 size={17} />
              {formData.startTime}
            </span>

            <span className="text-emerald-100">to</span>

            <span className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2">
              <Clock3 size={17} />
              {formData.endTime}
            </span>
          </div>
        </div>

        {/* Update form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <h2 className="text-lg font-bold text-slate-900">
              Update Schedule
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose your preferred day and working hours.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            {/* Day */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Working Day
              </label>

              <div className="relative">
                <CalendarDays
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                />

                <select
                  value={formData.day}
                  onChange={(e) => handleChange("day", e.target.value)}
                  className={`${inputClass} pl-12`}
                >
                  {DAYS.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Times */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start Time
                </label>

                <div className="relative">
                  <Clock3
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                  />

                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      handleChange("startTime", e.target.value)
                    }
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End Time
                </label>

                <div className="relative">
                  <Clock3
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
                  />

                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      handleChange("endTime", e.target.value)
                    }
                    className={`${inputClass} pl-12`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
              <strong>Note:</strong> Review your selected day and working
              hours before saving your changes.
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? (
                <LoaderCircle size={19} className="animate-spin" />
              ) : (
                <Save size={19} />
              )}

              {saving ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
