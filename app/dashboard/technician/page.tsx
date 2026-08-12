'use client';

import React, { useState } from 'react';
import { 
  Wallet, CalendarDays, ClipboardList, 
  CheckCircle, XCircle, PlayCircle, CheckSquare, Clock 
} from 'lucide-react';
import StatusBadge, { Status } from '../_components/StatusBadge';

// Mock Data for Technician Dashboard
const initialBookings = [
  { id: 'BK-1001', customer: 'John Doe', service: 'Deep House Cleaning', date: '2026-08-15', slot: '10:00 AM', status: 'REQUESTED', price: 1200 },
  { id: 'BK-1002', customer: 'Jane Smith', service: 'Plumbing Repair', date: '2026-08-12', slot: '02:00 PM', status: 'PAID', price: 500 },
  { id: 'BK-1003', customer: 'Alice Johnson', service: 'Electrical Wiring', date: '2026-08-10', slot: '11:00 AM', status: 'IN_PROGRESS', price: 800 },
  { id: 'BK-1004', customer: 'Bob Brown', service: 'Pipe Fitting', date: '2026-08-08', slot: '04:00 PM', status: 'COMPLETED', price: 1500 },
  { id: 'BK-1005', customer: 'Charlie Davis', service: 'Drain Cleaning', date: '2026-08-20', slot: '09:00 AM', status: 'ACCEPTED', price: 600 },
];

export default function TechnicianDashboard() {
  const [bookings, setBookings] = useState(initialBookings);

  // Status PATCH /api/technician/bookings/:id)
  const updateBookingStatus = (id: string, newStatus: string) => {
    setBookings((prev) => 
      prev.map((booking) => booking.id === id ? { ...booking, status: newStatus } : booking)
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header Info */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Technician Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your upcoming jobs, availability, and earnings.</p>
      </div>

      {/* ==========================================
          STATS OVERVIEW CARDS
      =========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Total Earnings</p>
            <h3 className="text-2xl font-black text-slate-900">৳12,500</h3>
          </div>
        </div>

        {/* Upcoming Jobs Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarDays className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Upcoming Jobs</p>
            <h3 className="text-2xl font-black text-slate-900">4</h3>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Pending Requests</p>
            <h3 className="text-2xl font-black text-slate-900">1</h3>
          </div>
        </div>

      </div>

      {/* ==========================================
          BOOKING MANAGEMENT TABLE
      =========================================== */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Job Requests & Active Bookings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Job ID & Service</th>
                <th className="px-6 py-4 font-semibold">Customer Info</th>
                <th className="px-6 py-4 font-semibold">Schedule</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* Service Details */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{booking.service}</div>
                    <div className="text-xs text-slate-400 font-medium">{booking.id} • ৳{booking.price}</div>
                  </td>
                  
                  {/* Customer */}
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {booking.customer}
                  </td>
                  
                  {/* Schedule */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-700">{booking.date}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> {booking.slot}
                    </div>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status as Status} />
                  </td>
                  
                  {/* Dynamic Action Buttons Based on Lifecycle */}
                  <td className="px-6 py-4 text-right space-x-2">
                    
                    {/* REQUESTED: Can Accept or Decline */}
                    {booking.status === 'REQUESTED' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'ACCEPTED')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-bold rounded-lg transition-all"
                        >
                          <CheckCircle className="w-4 h-4" /> Accept
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'DECLINED')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 text-xs font-bold rounded-lg transition-all"
                        >
                          <XCircle className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    )}

                    {/* ACCEPTED: Waiting for Customer Payment */}
                    {booking.status === 'ACCEPTED' && (
                      <span className="text-xs font-semibold text-slate-400 italic">
                        Waiting for payment...
                      </span>
                    )}

                    {/* PAID: Ready to Start Work */}
                    {booking.status === 'PAID' && (
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'IN_PROGRESS')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                      >
                        <PlayCircle className="w-4 h-4" /> Start Job
                      </button>
                    )}

                    {/* IN_PROGRESS: Mark as Completed */}
                    {booking.status === 'IN_PROGRESS' && (
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                      >
                        <CheckSquare className="w-4 h-4" /> Complete Job
                      </button>
                    )}

                    {/* COMPLETED or DECLINED: No further action */}
                    {['COMPLETED', 'DECLINED', 'CANCELLED'].includes(booking.status) && (
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        No Action Needed
                      </span>
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