"use client";

import { MapPin, BriefcaseBusiness, FileText } from "lucide-react";
import SkillsSelector from "./SkillsSelector";
import type { TechnicianProfile } from "@/types/technician";

type Props = {
  formData: TechnicianProfile;
  setFormData: React.Dispatch<
    React.SetStateAction<TechnicianProfile>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
};

export default function ProfileForm({
  formData,
  setFormData,
  onSubmit,
  isLoading = false,
}: Props) {
  const updateField = (
    field: keyof TechnicianProfile,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Experience */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Years of Experience
        </label>

        <div className="relative">
          <BriefcaseBusiness
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="number"
            min={0}
            max={50}
            required
            value={formData.experience}
            onChange={(e) =>
              updateField("experience", Number(e.target.value))
            }
            placeholder="Enter your experience"
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Service Location
        </label>

        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) =>
              updateField("location", e.target.value)
            }
            placeholder="e.g. Uttara, Dhaka"
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Professional Bio
        </label>

        <div className="relative">
          <FileText
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <textarea
            rows={4}
            maxLength={500}
            required
            value={formData.bio}
            onChange={(e) =>
              updateField("bio", e.target.value)
            }
            placeholder="Describe your professional experience..."
            className="w-full resize-none rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <p className="text-right text-xs text-slate-400">
          {formData.bio.length}/500
        </p>
      </div>

      {/* Skills */}
      <SkillsSelector
        selectedSkills={formData.skills}
        onChange={(skills) =>
          setFormData((prev) => ({
            ...prev,
            skills,
          }))
        }
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Saving Profile..." : "Save & Continue"}
      </button>
    </form>
  );
}