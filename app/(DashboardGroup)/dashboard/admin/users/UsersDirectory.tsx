"use client";

import { Search, ShieldCheck, SlidersHorizontal, UserCheck, Users, Wrench } from "lucide-react";
import { useMemo, useState } from "react";

export type AdminUser = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  image?: string;
  avatar?: string;
  phone?: string;
  createdAt?: string;
};

type RoleFilter = "ALL" | "ADMIN" | "TECHNICIAN" | "CUSTOMER";

const filters: { value: RoleFilter; label: string }[] = [
  { value: "ALL", label: "All users" },
  { value: "CUSTOMER", label: "Customers" },
  { value: "TECHNICIAN", label: "Technicians" },
  { value: "ADMIN", label: "Admins" },
];

function normaliseRole(role?: string) {
  const value = role?.toUpperCase();
  return value === "USER" ? "CUSTOMER" : value ?? "CUSTOMER";
}

function formatDate(date?: string) {
  if (!date || Number.isNaN(new Date(date).getTime())) return "Not available";
  return new Intl.DateTimeFormat("en-BD", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

function roleStyle(role: string) {
  if (role === "ADMIN") return "bg-violet-50 text-violet-700 ring-violet-100";
  if (role === "TECHNICIAN") return "bg-blue-50 text-blue-700 ring-blue-100";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function UsersDirectory({ users }: { users: AdminUser[] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const filteredUsers = useMemo(() => {
    const searchValue = query.trim().toLowerCase();
    return users.filter((user) => {
      const role = normaliseRole(user.role);
      const matchesRole = roleFilter === "ALL" || role === roleFilter;
      const matchesSearch = !searchValue || [user.name, user.email, user.phone, user.id].some((value) => value?.toLowerCase().includes(searchValue));
      return matchesRole && matchesSearch;
    });
  }, [users, query, roleFilter]);

  const counts = {
    customers: users.filter((user) => normaliseRole(user.role) === "CUSTOMER").length,
    technicians: users.filter((user) => normaliseRole(user.role) === "TECHNICIAN").length,
    admins: users.filter((user) => normaliseRole(user.role) === "ADMIN").length,
  };

  return <div className="space-y-7">
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Administration</p><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Manage users</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Review everyone who has access to your FixItNow platform.</p></div>
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500"><span className="font-bold text-slate-950">{users.length.toLocaleString("en-BD")}</span> registered users</div>
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      <SummaryCard label="Customers" value={counts.customers} icon={<Users size={19} />} color="bg-slate-100 text-slate-700" />
      <SummaryCard label="Technicians" value={counts.technicians} icon={<Wrench size={19} />} color="bg-blue-50 text-blue-600" />
      <SummaryCard label="Administrators" value={counts.admins} icon={<ShieldCheck size={19} />} color="bg-violet-50 text-violet-600" />
    </section>

    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div><h2 className="font-bold text-slate-950">User directory</h2><p className="mt-1 text-xs text-slate-400">{filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} shown</p></div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label className="relative block sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email or ID" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label>
          <div className="relative"><SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as RoleFilter)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-slate-600 outline-none focus:border-blue-400 sm:w-auto"><>{filters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</></select></div>
        </div>
      </div>

      {filteredUsers.length ? <div className="overflow-x-auto"><table className="w-full min-w-[760px]"><thead><tr className="border-b border-slate-100 bg-slate-50/70"><Header>User</Header><Header>Role</Header><Header>Contact</Header><Header>Joined</Header><Header align="right">Account</Header></tr></thead><tbody>{filteredUsers.map((user) => {
        const role = normaliseRole(user.role);
        const initials = (user.name ?? "User").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
        return <tr key={user.id} className="border-b border-slate-50 transition hover:bg-slate-50/70"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-700">{user.image ?? user.avatar ? <img src={user.image ?? user.avatar} alt={user.name ?? "User"} className="h-full w-full object-cover" /> : initials}</div><div className="min-w-0"><p className="max-w-52 truncate text-sm font-bold text-slate-900">{user.name ?? "Unnamed user"}</p><p className="max-w-52 truncate text-xs text-slate-400">ID: {user.id.slice(0, 10)}</p></div></div></td><td className="px-6 py-4"><span className={"inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ring-1 " + roleStyle(role)}>{role}</span></td><td className="px-6 py-4"><p className="text-sm text-slate-600">{user.email ?? "No email provided"}</p>{user.phone && <p className="mt-0.5 text-xs text-slate-400">{user.phone}</p>}</td><td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.createdAt)}</td><td className="px-6 py-4 text-right"><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><UserCheck size={14} /> Active</span></td></tr>;
      })}</tbody></table></div> : <div className="flex flex-col items-center justify-center px-6 py-16 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"><Search size={20} /></div><h3 className="mt-4 font-bold text-slate-800">No matching users</h3><p className="mt-1 text-sm text-slate-400">Try changing the search or role filter.</p></div>}
    </section>
  </div>;
}

function SummaryCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className={"flex h-10 w-10 items-center justify-center rounded-xl " + color}>{icon}</div><p className="mt-4 text-sm font-medium text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold text-slate-950">{value.toLocaleString("en-BD")}</p></div>;
}
function Header({ children, align }: { children: React.ReactNode; align?: "right" }) { return <th className={"px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 " + (align === "right" ? "text-right" : "")}>{children}</th>; }
