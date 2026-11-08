"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfilePreview from "./ProfilePreview";

import type {
  setTechnicianProfile,
  TechnicianProfile,
} from "@/types/technician";
import { TechnicianProfileSet } from "@/service/technicianService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileClient() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<setTechnicianProfile>({
    experience: 0,
    bio: "",
    location: "",
    skills: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await TechnicianProfileSet(
        formData as TechnicianProfile,
      );

      if (!response.success) {
        toast.error(response.message || "Profile setup failed!");
        return;
      }

      toast.success(response.message || "Profile setup successful!");
      router.push("/dashboard/technician/availability");
    } catch (error) {
      console.error("Profile setup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ProfileHeader />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
          <ProfileForm
            formData={formData as TechnicianProfile}
            setFormData={
              setFormData as React.Dispatch<
                React.SetStateAction<TechnicianProfile>
              >
            }
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="lg:sticky lg:top-8 lg:col-span-2">
          <ProfilePreview profile={formData as TechnicianProfile} />

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <Sparkles size={20} className="shrink-0 text-blue-600" />

              <p className="text-xs leading-5 text-blue-700">
                A complete professional profile helps customers understand your
                expertise and choose your services with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
