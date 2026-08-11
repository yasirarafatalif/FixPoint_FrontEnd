import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, CalendarDays, CreditCard, Settings, Wrench } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Wrench className="w-5 h-5 text-blue-500" /> FixItNow
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/dashboard/customer" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/dashboard/customer/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <CalendarDays className="w-5 h-5" />
            My Bookings
          </Link>
          <Link href="/dashboard/customer/payments" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <CreditCard className="w-5 h-5" />
            Payment History
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/dashboard/customer/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4">
           <span className="font-bold text-lg text-slate-900">Dashboard</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}