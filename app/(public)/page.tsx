import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Star, Wrench, Zap, Droplets, PaintRoller, ArrowRight } from 'lucide-react';
import { getAllServices } from '@/service/getAllServices';


// Simulated Data Fetching (Replace with actual GET /api/services)
const FEATURED_SERVICES = [
  {
    id: '1',
    title: 'Expert Plumbing Repair',
    technician: 'Rahim Uddin',
    rating: 4.9,
    reviews: 128,
    price: 500,
    // image: 'https://images.unsplash.com/photo-1607472586893-edb57cb8b4eb?q=80&w=800&auto=format&fit=crop',
    category: 'Plumbing'
  },
  {
    id: '2',
    title: 'Home Electrical Wiring',
    technician: 'Kawsar Ahmed',
    rating: 4.8,
    reviews: 95,
    price: 800,
    // image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    category: 'Electrical'
  },
  {
    id: '3',
    title: 'Deep House Cleaning',
    technician: 'Ayesha Begum',
    rating: 5.0,
    reviews: 210,
    price: 1200,
    // image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    category: 'Cleaning'
  },
  {
    id: '4',
    title: 'Interior Wall Painting',
    technician: 'Hasan Mahmud',
    rating: 4.7,
    reviews: 64,
    price: 2500,
    // image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    category: 'Painting'
  }
];

const CATEGORIES = [
  { name: 'Plumbing', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Electrical', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { name: 'Cleaning', icon: Wrench, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'Painting', icon: PaintRoller, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default async function HomePage() {
  const services = await getAllServices();
  console.log(services);



  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* ==============================
          1. HERO SECTION
      ============================== */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Your Trusted <span className="text-blue-500">Home Service</span> Platform
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Book qualified professionals for plumbing, electrical, cleaning, and painting services in seconds.
          </p>

          {/* Quick Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="What service do you need?" 
                className="w-full bg-transparent text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Your location" 
                className="w-full bg-transparent text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ==============================
          2. SERVICE CATEGORIES
      ============================== */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <Link href={`/services?category=${category.name.toLowerCase()}`} key={index}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer text-center group">
                <div className={`w-16 h-16 mx-auto ${category.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==============================
          3. FEATURED SERVICES GRID
      ============================== */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Top-Rated Technicians</h2>
              <p className="text-slate-500">Book our most highly recommended professionals.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                
                {/* Optimized Image Component */}
                <div className="relative h-48 w-full bg-slate-100">
                  {/* <Image 
                    src={service.image ||""} 
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  /> */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-slate-700">
                    {service.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">{service.rating}</span>
                    <span className="text-slate-400 text-xs ml-1">({service.reviews} reviews)</span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{service.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">by {service.technician}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400">Starting at</p>
                      <p className="font-extrabold text-blue-600 text-lg">৳{service.price}</p>
                    </div>
                    <Link href={`/technicians/${service.id}`}>
                      <button className="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/services">
              <button className="w-full bg-blue-50 text-blue-600 font-semibold py-3 rounded-xl border border-blue-100">
                View All Services
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* ==============================
          4. SIMPLE FOOTER
      ============================== */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">FixItNow</span>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} FixItNow Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}