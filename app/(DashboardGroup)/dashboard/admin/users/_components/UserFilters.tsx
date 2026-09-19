"use client";

import { Search } from "lucide-react";
import type {
  UserRole,
  UserStatus,
} from "../UsersClient";

interface UserFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  role: "ALL" | UserRole;
  setRole: (value: "ALL" | UserRole) => void;

  status: "ALL" | UserStatus;
  setStatus: (value: "ALL" | UserStatus) => void;
}

export default function UserFilters({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
}: UserFiltersProps) {
  return (
    <div className="border-b border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search users by name or email..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Role */}
        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as "ALL" | UserRole
            )
          }
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="ALL">All Roles</option>
          <option value="CUSTOMER">
            Customers
          </option>
          <option value="TECHNICIAN">
            Technicians
          </option>
          <option value="ADMIN">Admins</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as "ALL" | UserStatus
            )
          }
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>
    </div>
  );
}