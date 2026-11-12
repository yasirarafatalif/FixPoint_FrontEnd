"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";
import Swal from "sweetalert2";

import type { UserUpdateProfile ,User} from "@/types/user";

import ProfilePageHeader from "./ProfilePageHeader";
import ProfileHeader from "./ProfileHeader";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileField, { inputClass } from "./ProfileField";
import AccountInformation from "./AccountInformation";
import { uploadImage } from "@/lib/uploadImage";
import { updateUserProfile } from "@/service/users.services";

// interface Props {
//   profile: UserUpdateProfile;
// }
interface Props {
  profile: User;
}

export default function ProfileUpdateForm({ profile }: Props) {
  // console.log("formprofile update form page",profile);
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");

  // Image states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const previewUrlRef = useRef<string | null>(null);

  // Release the local preview URL when the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // Handle image selection
  const handleImageChange = (file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (file) {
      previewUrlRef.current = URL.createObjectURL(file);
      setPreviewImage(previewUrlRef.current);
    } else {
      setPreviewImage("");
    }

    setSelectedImage(file);
  };

  // Cancel editing
  const handleCancel = () => {
    setName(profile.name || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
    handleImageChange(null);
    setEditing(false);
  };

  // Update profile
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: {
      name?: string;
      phone?: string;
      address?: string;
      profileImage?: string;
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

    // Nothing changed
    if (Object.keys(updatedData).length === 0 && !selectedImage) {
      await Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "You haven't changed any information.",
      });

      return;
    }

    try {
      setLoading(true);

      // Step 1: Upload image to ImgBB
      if (selectedImage) {
        const imageUrl = await uploadImage(selectedImage);

        updatedData.profileImage = imageUrl;
      }

      // Step 2: Update profile
      const result = await updateUserProfile(updatedData);

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.message || "Could not update your profile.",
        });

        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information and image have been saved successfully.",
        timer: 2200,
        showConfirmButton: false,
      });

      handleImageChange(null);
      setEditing(false);

      router.refresh();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ProfilePageHeader />

      <ProfileHeader profile={profile} previewImage={previewImage} />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
      >
        {/* Form Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal and contact information.
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

        {/* Image Upload */}
        <ProfileImageUpload
          previewImage={previewImage}
          selectedImage={selectedImage}
          editing={editing}
          loading={loading}
          onImageChange={handleImageChange}
        />

        {/* Form Fields */}
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <ProfileField label="Full Name" icon={<UserRound size={16} />}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing || loading}
              required
              maxLength={100}
              className={inputClass}
              placeholder="Enter your full name"
            />
          </ProfileField>

          <ProfileField label="Email Address" icon={<Mail size={16} />}>
            <input
              type="email"
              value={profile.email || ""}
              disabled
              readOnly
              className={inputClass}
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </ProfileField>

          <ProfileField label="Phone Number" icon={<Phone size={16} />}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editing || loading}
              className={inputClass}
              placeholder="Enter your phone number"
            />
          </ProfileField>

          <ProfileField label="Address" icon={<MapPin size={16} />}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!editing || loading}
              maxLength={250}
              className={inputClass}
              placeholder="Enter your address"
            />
          </ProfileField>
        </div>

        {/* Form Actions */}
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
              {loading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>

      <AccountInformation profile={profile} />
    </div>
  );
}
