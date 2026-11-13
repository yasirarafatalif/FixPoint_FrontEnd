
"use client";

import { useState, useMemo } from "react";
import type { Service } from "@/types/servicesTypes";

import ServiceCard from "./ServiceCard";
import ServiceFilters from "./ServiceFilters";

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

export default function ServicesClient({
  services = [],
  categories = [],
}: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const [serviceStatus, setServiceStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [techAvailability, setTechAvailability] = useState<
    "all" | "available" | "busy"
  >("all");

  const [priceSort, setPriceSort] = useState<
    "default" | "lowToHigh" | "highToLow"
  >("default");

  // Filter Services
  const filteredServices = useMemo(() => {
    return services
      .filter((service: Service) => {
        // Category Filter
        if (selectedCategoryId !== "all") {
          const serviceCatId = String(service?.categoryId || "").trim();

          if (
            serviceCatId.toLowerCase() !==
            selectedCategoryId.toLowerCase()
          ) {
            return false;
          }
        }

        // Service Status
        if (serviceStatus === "active" && !service.isActive) {
          return false;
        }

        if (serviceStatus === "inactive" && service.isActive) {
          return false;
        }

        // Technician Availability
        if (
          techAvailability === "available" &&
          !service.technician?.isAvailable
        ) {
          return false;
        }

        if (
          techAvailability === "busy" &&
          service.technician?.isAvailable
        ) {
          return false;
        }

        return true;
      })
      .sort((a: Service, b: Service) => {
        // Price Sorting
        if (priceSort === "lowToHigh") {
          return Number(a.price || 0) - Number(b.price || 0);
        }

        if (priceSort === "highToLow") {
          return Number(b.price || 0) - Number(a.price || 0);
        }

        return 0;
      });
  }, [
    services,
    selectedCategoryId,
    serviceStatus,
    techAvailability,
    priceSort,
  ]);

  // Reset All Filters
  const handleReset = () => {
    setSelectedCategoryId("all");
    setServiceStatus("all");
    setTechAvailability("all");
    setPriceSort("default");
  };

  return (
    <div className="space-y-6">

      {/* Filters Component */}
      <ServiceFilters
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        serviceStatus={serviceStatus}
        setServiceStatus={setServiceStatus}
        techAvailability={techAvailability}
        setTechAvailability={setTechAvailability}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        onReset={handleReset}
      />

      {/* Result Count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredServices.length} of {services.length} services
        </span>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service: Service) => (
            <ServiceCard
              key={service.title}
              service={service}
            />
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
