"use client";

import {
  Ban,
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Users,
} from "lucide-react";

import type { User, UserRole, UserStatus } from "../UsersClient";
import Swal from "sweetalert2";
import { adminUpdateUserStatus } from "@/service/adminUsersStatusUpdate";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const handleBanUnban = async (userId: string, status: UserStatus) => {
    const newStatus = status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    const result = await Swal.fire({
      title: newStatus === "BLOCKED" ? "Block User?" : "Activate User?",
      text:
        newStatus === "BLOCKED"
          ? "This user will be blocked."
          : "This user will be activated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        newStatus === "BLOCKED" ? "Yes, Block" : "Yes, Activate",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const response = await adminUpdateUserStatus(userId, newStatus);

    if (!response.success) {
      await Swal.fire({
        title: "Failed!",
        text: response.message,
        icon: "error",
      });

      return;
    }

    await Swal.fire({
      title: "Success!",
      text:
        newStatus === "BLOCKED"
          ? "User blocked successfully."
          : "User activated successfully.",
      icon: "success",
    });
    window.location.reload();
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Users size={22} className="text-slate-400" />
        </div>

        <h3 className="font-semibold text-slate-900">No users found</h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              User
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Role
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Address
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Joined
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <UserRow key={user.id} user={user} onBanUnban={handleBanUnban} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({
  user,
  onBanUnban,
}: {
  user: User;
  onBanUnban: (userId: string, status: UserStatus) => void;
}) {
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className="transition hover:bg-slate-50/70">
      {/* User */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          {/* Profile */}
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
              {initials}
            </div>
          )}

          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>

            <p className="mt-0.5 text-xs text-slate-400">
              ID: {user.id.slice(-8)}
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-5 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Mail size={13} />
            {user.email}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Phone size={13} />
            {user.phone}
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-5 py-4">
        <RoleBadge role={user.role} />
      </td>

      {/* Address */}
      <td className="px-5 py-4">
        <div className="flex max-w-[180px] items-start gap-1.5 text-sm text-slate-600">
          <MapPin size={14} className="mt-0.5 shrink-0" />

          <span className="truncate">{user.address || "Not provided"}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={user.status} />
      </td>

      {/* Joined */}
      <td className="px-5 py-4 text-sm text-slate-500">
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-1">
          <button
            title="View user"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={17} />
          </button>

          <button
            title="Edit user"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onBanUnban(user.id, user.status)}
            title={user.status === "ACTIVE" ? "Suspend user" : "Activate user"}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            {user.status === "ACTIVE" ? (
              <Ban size={17} />
            ) : (
              <CheckCircle2 size={17} />
            )}
          </button>

          <button
            title="More"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const styles = {
    CUSTOMER: "bg-blue-50 text-blue-700 border-blue-100",
    TECHNICIAN: "bg-violet-50 text-violet-700 border-violet-100",
    ADMIN: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[role]}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const active = status === "ACTIVE";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        active
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}
