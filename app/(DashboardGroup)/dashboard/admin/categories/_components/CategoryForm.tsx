"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { createAdminCategory } from "@/service/adminCategoryService";

interface CategoryFormProps {
  onClose: () => void;
}

export default function CategoryForm({
  onClose,
}: CategoryFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        title: "Category name required",
        text: "Please enter a category name.",
        icon: "warning",
      });

      return;
    }

    try {
      setLoading(true);

      const result = await createAdminCategory(
        name.trim(),
        description.trim()
      );

      if (!result.success) {
        Swal.fire({
          title: "Failed!",
          text: result.message,
          icon: "error",
        });

        return;
      }

      await Swal.fire({
        title: "Created!",
        text: "Category created successfully.",
        icon: "success",
      });

      setName("");
      setDescription("");

      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Failed!",
        text: "Something went wrong.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Add Category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create a new service category.
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Plumbing"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={17} />

            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}