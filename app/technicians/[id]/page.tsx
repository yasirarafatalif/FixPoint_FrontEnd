'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Star, MapPin, ShieldCheck, Clock, CalendarDays, 
  CheckCircle2, Wrench, Loader2, ThumbsUp 
} from 'lucide-react';

// demo data for a single technician
const technicianData = {
  id: '101',
  name: 'Rahim Ahmed',
  category: 'Plumbing',
  bio: 'Professional plumber with over 7 years of experience in residential and commercial plumbing systems. Guaranteed quality work and quick problem resolution.',
  rating: 4.8,
  reviewsCount: 124,
  location: 'Uttara, Dhaka',
  skills: ['Pipe Fitting', 'Water Heater Repair', 'Leak Detection', 'Drain Cleaning'],
  price: 800,
  image: '',
  availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
};

export default function TechnicianSinglePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // bokking handler
  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) return;
    
    setIsBooking(true);
    
    // API Call (POST /api/bookings)
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard/customer');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-900 h-48 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ==========================================
              LEFT COLUMN: Technician Details
          =========================================== */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                
                {/* Profile Image */}
                <div className="w-32 h-32 relative rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-slate-100">
                  <Image 
                    src={technicianData.image} 
                    alt={technicianData.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase">
                      <Wrench className="w-3.5 h-3.5" /> {technicianData.category}
                    </span>
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg text-amber-600 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      {technicianData.rating} <span className="text-amber-500/70 font-medium">({technicianData.reviewsCount})</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                    {technicianData.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {technicianData.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-4 h-4" /> Verified Pro
                    </span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {technicianData.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Specialized Skills */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-500" /> Specialized Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {technicianData.skills.map((skill, index) => (
                  <div key={index} className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-slate-700 hover:border-blue-200 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <ThumbsUp className="w-6 h-6 text-blue-500" /> Customer Reviews
              </h3>
              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50">
                <p className="text-slate-500 font-medium">No written reviews yet. Book a service and leave the first review!</p>
              </div>
            </div>

          </div>


          {/* ==========================================
              RIGHT COLUMN: Interactive Booking Widget
          =========================================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200">
              
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Book Service</h2>
              <p className="text-slate-500 text-sm mb-6">Select your preferred schedule.</p>

              <div className="space-y-6">
                
                {/* Price Display */}
                <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <span className="font-semibold text-slate-700">Starting at</span>
                  <span className="text-3xl font-black text-blue-600">৳{technicianData.price}</span>
                </div>

                {/* 1. Select Date */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CalendarDays className="w-4 h-4 text-blue-500" /> Select Date
                  </label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(''); // Reset slot when date changes
                    }}
                    min={new Date().toISOString().split('T')[0]} 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 cursor-pointer transition-all"
                  />
                </div>

                {/* 2. Select Time Slot */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Clock className="w-4 h-4 text-blue-500" /> Available Time Slots
                  </label>
                  
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {technicianData.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 px-2 text-sm font-bold rounded-xl border transition-all ${
                            selectedSlot === slot 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 text-slate-500 text-sm font-medium rounded-xl border border-slate-100 text-center">
                      Please select a date to see slots.
                    </div>
                  )}
                </div>

                {/* 3. Submit Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedSlot || isBooking || bookingSuccess}
                    className="w-full py-4 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isBooking ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : bookingSuccess ? (
                      <><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Booking Requested!</>
                    ) : (
                      'Request Booking'
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                    No hidden fees. You will pay after the technician accepts the job.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}