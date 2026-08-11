import React from 'react';

export type Status = 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

const statusStyles: Record<Status, string> = {
  REQUESTED: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  DECLINED: 'bg-red-100 text-red-800',
  PAID: 'bg-purple-100 text-purple-800',
  IN_PROGRESS: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-slate-800 text-slate-100',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}