'use client';

import React from 'react';
import { CreditCard, XCircle, Star } from 'lucide-react';
import StatusBadge, { Status } from '../_components/StatusBadge';

// Demo Data
const bookings = [
  { id: 'BK-1001', service: 'Deep House Cleaning', date: '2026-08-15', slot: '10:00 AM', status: 'ACCEPTED', price: 1200 },
  { id: 'BK-1002', service: 'Plumbing Repair', date: '2026-08-12', slot: '02:00 PM', status: 'COMPLETED', price: 500 },
  { id: 'BK-1003', service: 'Electrical Wiring', date: '2026-08-20', slot: '11:00 AM', status: 'REQUESTED', price: 800 },
];

export default function CustomerDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Info */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, John Doe!</h1>
        <p className="text-slate-500 mt-1">Manage your home service bookings and payments.</p>
      </div>

      {/* Booking History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Recent Bookings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Schedule</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{booking.service}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{booking.date}</div>
                    <div className="text-xs text-slate-400">{booking.slot}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status as Status} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    
                    {/* Pay Button for ACCEPTED bookings */}
                    {booking.status === 'ACCEPTED' && (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                        <CreditCard className="w-3.5 h-3.5" /> Pay ৳{booking.price}
                      </button>
                    )}

                    {/* Review Button for COMPLETED bookings */}
                    {booking.status === 'COMPLETED' && (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-200 transition">
                        <Star className="w-3.5 h-3.5" /> Leave Review
                      </button>
                    )}

                    {/* Cancel Button (Only if not IN_PROGRESS or COMPLETED) */}
                    {['REQUESTED', 'ACCEPTED', 'PAID'].includes(booking.status) && (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}