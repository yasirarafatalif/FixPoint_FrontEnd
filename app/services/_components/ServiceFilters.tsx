import React from "react";
import { Search, MapPin, Star, Tag, XCircle } from "lucide-react";

interface FilterProps {
  search: string;
  category: string;
  location: string;
  rating: string;
  maxPrice: string;
  categories: string[];
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onRatingChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onClear: () => void;
}

export default function ServiceFilters({
  search, category, location, rating, maxPrice, categories,
  onSearchChange, onCategoryChange, onLocationChange, onRatingChange, onMaxPriceChange, onClear
}: FilterProps) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 w-full">
      
      {/* Top Row: Search & Location */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="What service are you looking for?"
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        
        {/* Location */}
        <div className="md:w-1/3 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Location (e.g. Dhaka)"
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Bottom Row: Category, Rating, Price & Clear Button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        
        {/* Category */}
        <div className="relative w-full">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="relative w-full">
          <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={rating}
            onChange={(e) => onRatingChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col justify-center px-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Max Price</span>
            <span className="text-xs font-black text-blue-600">
              {maxPrice ? `৳${maxPrice}` : 'Any'}
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={maxPrice || "5000"}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Clear Filters Button */}
        <button 
          onClick={onClear} 
          className="flex justify-center items-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-2xl transition-colors w-full"
        >
          <XCircle className="w-4 h-4" /> Clear Filters
        </button>

      </div>
    </div>
  );
}