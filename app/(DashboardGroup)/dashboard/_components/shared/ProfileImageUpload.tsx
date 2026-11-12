
"use client";

import { useRef } from "react";
import {
  UserRound,
  Camera,
  ImagePlus,
  Trash2,
} from "lucide-react";

interface ProfileImageUploadProps {
  previewImage: string;
  selectedImage: File | null;
  editing: boolean;
  loading: boolean;
  onImageChange: (file: File | null) => void;
}

export default function ProfileImageUpload({
  previewImage,
  selectedImage,
  editing,
  loading,
  onImageChange,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    // Maximum image size: 5MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    onImageChange(file);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    onImageChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-7 border-t border-slate-100 pt-6">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-slate-800">
          Profile Picture
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Upload a profile image from your device.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Image Preview */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound
              size={36}
              className="text-slate-300"
            />
          )}
        </div>

        <div className="flex-1">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={!editing || loading}
            className="hidden"
          />

          {/* Image Actions */}
          {editing && (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {selectedImage ? (
                  <Camera size={16} />
                ) : (
                  <ImagePlus size={16} />
                )}

                {selectedImage ? "Change Image" : "Choose Image"}
              </button>

              {selectedImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              )}
            </div>
          )}

          {/* Selected Image Information */}
          {selectedImage ? (
            <div className="mt-3 space-y-1">
              <p className="break-all text-sm font-medium text-slate-700">
                {selectedImage.name}
              </p>

              <p className="text-xs text-emerald-600">
                <span className="font-medium">
                  ✓ Image selected successfully.
                </span>
              </p>

              <p className="text-xs text-slate-500">
                Your image will be uploaded to ImgBB when you save your profile.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-400">
              JPG, PNG or WEBP. Maximum file size: 5MB.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
