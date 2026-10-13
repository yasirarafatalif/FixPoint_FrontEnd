"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  Save,
  X,
  BriefcaseBusiness,
} from "lucide-react";
import Swal from "sweetalert2";

import type { TechnicianProfile } from "@/types/technician";
import { updateTechnicianProfile } from "@/service/technicianService";

interface Props {
  profile: TechnicianProfile;
}

export default function TechnicianProfileForm({ profile }: Props) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");

  const handleCancel = () => {
    setName(profile.name || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
    setEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: {
      name?: string;
      phone?: string;
      address?: string;
    } = {};

    if (name.trim() !== (profile.name || "")) {
      updatedData.name = name.trim();
    }

    if (phone.trim() !== (profile.phone || "")) {
      updatedData.phone = phone.trim();
    }

    if (address.trim() !== (profile.address || "")) {
      updatedData.address = address.trim();
    }

    if (Object.keys(updatedData).length === 0) {
      await Swal.fire({
        icon: "info",
        title: "No changes",
        text: "You haven't changed any information.",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await updateTechnicianProfile(updatedData);

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Update failed",
          text: result.message || "Could not update your profile.",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Profile updated!",
        text: "Your information has been saved successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setEditing(false);
      router.refresh();
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:bg-slate-50 disabled:text-slate-500";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-violet-600">
          Technician Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Manage Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your personal information and professional identity.
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600" />

        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-violet-50 text-violet-600 shadow-sm">
                  <UserRound size={38} />
                </div>
              )}

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {profile.email}
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {profile.status || "ACTIVE"}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <BriefcaseBusiness size={16} className="text-violet-600" />
              Technician
            </span>

            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <ShieldCheck size={16} className="text-emerald-600" />
              Verified account status: {profile.status || "ACTIVE"}
            </span>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your contact details.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <UserRound size={16} className="text-slate-400" />
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing || loading}
              required
              maxLength={100}
              className={inputClass}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Mail size={16} className="text-slate-400" />
              Email Address
            </label>
            <input
              value={profile.email || ""}
              disabled
              readOnly
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Phone size={16} className="text-slate-400" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing || loading}
              required
              className={inputClass}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin size={16} className="text-slate-400" />
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!editing || loading}
              required
              maxLength={250}
              className={inputClass}
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Actions */}
        {editing && (
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <X size={16} />
              Discard Changes
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>

      {/* Account Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="font-bold text-slate-900">Account Information</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-400">Account ID</p>
            <p className="mt-1 break-all text-sm font-medium text-slate-700">
              {profile.id}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Account Role</p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {profile.role || "TECHNICIAN"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}