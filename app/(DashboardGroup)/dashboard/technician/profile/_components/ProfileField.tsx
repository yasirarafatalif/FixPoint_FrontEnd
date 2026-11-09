import type { ReactNode } from "react";

interface ProfileFieldProps {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:bg-slate-50 disabled:text-slate-500";

export default function ProfileField({
  label,
  icon,
  children,
}: ProfileFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-slate-400">{icon}</span>
        {label}
      </label>

      {children}
    </div>
  );
}