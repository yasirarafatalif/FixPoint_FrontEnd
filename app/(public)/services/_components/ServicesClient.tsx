"use client";

import { useState, useMemo } from "react";
import type { Service } from "@/types/servicesTypes";
import ServiceCard from "./ServiceCard"; 

interface Category {
  id?: string;
  _id?: string;
  categoryId?: string;
  name: string;
}

interface Props {
  services: Service[];
  categories: Category[];
}

export default function ServicesClient({ services = [], categories = [] }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [serviceStatus, setServiceStatus] = useState<"all" | "active" | "inactive">("all");
  const [techAvailability, setTechAvailability] = useState<"all" | "available" | "busy">("all");
  const [priceSort, setPriceSort] = useState<"default" | "lowToHigh" | "highToLow">("default");

  // Helper to safely get category ID
  const getCatId = (cat: Category): string => {
    return String(cat.id || cat._id || cat.categoryId || "").trim();
  };

  // Filter logic
  const filteredServices = useMemo(() => {
    return services
      .filter((service: Service) => {
        // 1. Category Filter Check
        if (selectedCategoryId !== "all") {
          const serviceCatId = String(service?.categoryId || "").trim();

          if (serviceCatId.toLowerCase() !== selectedCategoryId.toLowerCase()) {
            return false;
          }
        }

        // 2. Service Active Status
        if (serviceStatus === "active" && !service.isActive) return false;
        if (serviceStatus === "inactive" && service.isActive) return false;

        // 3. Technician Availability
        if (techAvailability === "available" && !service.technician?.isAvailable) return false;
        if (techAvailability === "busy" && service.technician?.isAvailable) return false;

        return true;
      })
      .sort((a: Service, b: Service) => {
        // 4. Price Sort
        if (priceSort === "lowToHigh") return Number(a.price || 0) - Number(b.price || 0);
        if (priceSort === "highToLow") return Number(b.price || 0) - Number(a.price || 0);
        return 0;
      });
  }, [services, selectedCategoryId, serviceStatus, techAvailability, priceSort]);

  const handleReset = () => {
    setSelectedCategoryId("all");
    setServiceStatus("all");
    setTechAvailability("all");
    setPriceSort("default");
  };

  return (
    <div className="space-y-6">
      {/* All Filters In One Single Grid */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* 1. Category Filter Dropdown */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, index) => {
                const catId = getCatId(cat);
                return (
                  <option key={catId || index} value={catId}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* 2. Price Filter Dropdown */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Price
            </label>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as typeof priceSort)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="default">Default Order</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* 3. Service Status (Available / Active) */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Service Status
            </label>
            <select
              value={serviceStatus}
              onChange={(e) => setServiceStatus(e.target.value as typeof serviceStatus)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="all">All Services</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          {/* 4. Technician Status (Available / Busy) */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Technician Status
            </label>
            <select
              value={techAvailability}
              onChange={(e) => setTechAvailability(e.target.value as typeof techAvailability)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option value="all">All Technicians</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy / Unavailable</option>
            </select>
          </div>

          {/* 5. Reset Action */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredServices.length} of {services.length} services
        </span>
      </div>

      {/* Services Grid with Modern ServiceCard */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service: Service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
          No services match your selected filter criteria.
        </div>
      )}
    </div>
  );
}