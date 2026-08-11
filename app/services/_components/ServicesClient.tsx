"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import ServiceCard, { Service } from "./ServiceCard";
import ServiceFilters from "./ServiceFilters";

// Demo Data
const demoServices: Service[] = [
  {
    id: "s1",
    title: "Professional Plumbing Repair",
    description:
      "Reliable plumbing repair and pipe installation for your home and office.",
    price: 800,
    category: "Plumbing",
    location: "Uttara, Dhaka",
    rating: 4.8,
    totalReviews: 124,
    image:"",
    technician: {
      id: "101",
      name: "Rahim Ahmed",
      image: "https://i.pravatar.cc/150?img=11",
      experience: 7,
    },
  },
  {
    id: "s2",
    title: "Home Electrical Wiring",
    description:
      "Safe and professional electrical repair, wiring, and maintenance.",
    price: 1200,
    category: "Electrical",
    location: "Mirpur, Dhaka",
    rating: 4.9,
    totalReviews: 98,
    image:"",
    technician: {
      id: "102",
      name: "Sakib Hasan",
      image: "https://i.pravatar.cc/150?img=12",
      experience: 5,
    },
  },
  {
    id: "s3",
    title: "Deep Home Cleaning",
    description: "Complete home cleaning service with professional equipment.",
    price: 1500,
    category: "Cleaning",
    location: "Dhanmondi, Dhaka",
    rating: 4.7,
    totalReviews: 211,
    image:"",
    technician: {
      id: "103",
      name: "Ayesha Begum",
      image: "https://i.pravatar.cc/150?img=5",
      experience: 6,
    },
  },
];

export default function ServicesClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [...new Set(demoServices.map((s) => s.category))];

  const filteredServices = useMemo(() => {
    return demoServices.filter((service) => {
      const matchesSearch = !search || service.title.toLowerCase().includes(search.toLowerCase()) || service.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || service.category === category;
      const matchesLocation = !location || service.location.toLowerCase().includes(location.toLowerCase());
      const matchesRating = !rating || service.rating >= Number(rating);
      const matchesPrice = !maxPrice || service.price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesLocation && matchesRating && matchesPrice;
    });
  }, [search, category, location, rating, maxPrice]);

  const clearFilters = () => {
    setSearch(""); setCategory(""); setLocation(""); setRating(""); setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Premium Header Banner */}
      <section className="relative bg-slate-900 py-16 lg:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[200%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[150%] rounded-full bg-indigo-600/20 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Find the Perfect <span className="text-blue-500">Professional</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Book trusted, verified experts for any home service. Search, filter, and hire in seconds.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">
        
        {/* --- Top Filter Bar --- */}
        <div className="mb-10">
          <ServiceFilters
            search={search} category={category} location={location} rating={rating} maxPrice={maxPrice}
            categories={categories} onSearchChange={setSearch} onCategoryChange={setCategory} onLocationChange={setLocation}
            onRatingChange={setRating} onMaxPriceChange={setMaxPrice} onClear={clearFilters}
          />
        </div>

        {/* --- Results Section --- */}
        <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Available Services</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Showing <span className="text-slate-900 font-bold">{filteredServices.length}</span> results
            </p>
          </div>
          
          {/* Quick Sort (Optional) */}
          <div className="hidden sm:block">
            <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* --- Services Grid --- */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border-2 border-slate-200 border-dashed text-center p-8 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <SearchX className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No services found</h3>
            <p className="text-slate-500 max-w-md mb-8">We couldn&apos;t find any services matching your criteria. Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95">
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}