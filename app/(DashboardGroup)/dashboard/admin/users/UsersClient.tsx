"use client";

import { useMemo, useState } from "react";
import UserStats from "./_components/UserStats";
import UserFilters from "./_components/UserFilters";
import UserTable from "./_components/UserTable";
import { AdminUser } from "@/types/adminUser";


export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updateAt: string;
}


interface UsersClientProps {
  users: AdminUser[];
}

export default function UsersClient({
  users,
}: UsersClientProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"ALL" | UserRole>("ALL");
  const [status, setStatus] =
    useState<"ALL" | UserStatus>("ALL");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole =
        role === "ALL" || user.role === role;

      const matchesStatus =
        status === "ALL" || user.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, role, status]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-blue-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Manage Users
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Search, review and manage customer and technician
          accounts.
        </p>
      </div>

      {/* Stats */}
      <UserStats users={users} />

      {/* Users */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <UserFilters
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
        />

        <UserTable users={filteredUsers} />

        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {users.length}
            </span>{" "}
            users
          </p>
        </div>
      </div>
    </div>
  );
}