"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import ServiceCard, {
  Service,
} from "./ServiceCard";

import ServiceFilters from "./ServiceFilters";

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({
  services,
}: ServicesClientProps) {
  // ================================
  // Filter States
  // ================================
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] =
    useState("");
  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [duration, setDuration] = useState("");
  const [sort, setSort] = useState("recommended");

  // ================================
  // Locations
  // ================================
  const locations = useMemo(() => {
    return [
      ...new Set(
        services.map(
          (service) =>
            service.technician.location
        )
      ),
    ];
  }, [services]);

  // ================================
  // Skills
  // ================================
  const skills = useMemo(() => {
    return [
      ...new Set(
        services.flatMap(
          (service) =>
            service.technician.skills || []
        )
      ),
    ];
  }, [services]);

  // ================================
  // Filter + Sort
  // ================================
  const filteredServices = useMemo(() => {
    const result = services.filter((service) => {
      const searchValue =
        search.trim().toLowerCase();

      // Search
      const matchesSearch =
        !searchValue ||
        service.title
          .toLowerCase()
          .includes(searchValue) ||
        service.description
          .toLowerCase()
          .includes(searchValue) ||
        service.technician.bio
          .toLowerCase()
          .includes(searchValue) ||
        service.technician.skills.some(
          (item) =>
            item
              .toLowerCase()
              .includes(searchValue)
        );

      // Location
      const matchesLocation =
        !location ||
        service.technician.location ===
          location;

      // Skill
      const matchesSkill =
        !skill ||
        service.technician.skills.includes(skill);

      // Minimum Price
      const matchesMinPrice =
        !minPrice ||
        service.price >= Number(minPrice);

      // Maximum Price
      const matchesMaxPrice =
        !maxPrice ||
        service.price <= Number(maxPrice);

      // Experience
      const matchesExperience =
        !experience ||
        service.technician.experience >=
          Number(experience);

      // Duration
      const matchesDuration =
        !duration ||
        service.duration <= Number(duration);

      // Availability
      const matchesAvailability =
        !availability ||
        (availability === "available" &&
          service.technician.isAvailable) ||
        (availability === "unavailable" &&
          !service.technician.isAvailable);

      return (
        service.isActive &&
        matchesSearch &&
        matchesLocation &&
        matchesSkill &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesExperience &&
        matchesDuration &&
        matchesAvailability
      );
    });

    // ================================
    // Sorting
    // ================================

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "experience") {
      result.sort(
        (a, b) =>
          b.technician.experience -
          a.technician.experience
      );
    }

    if (sort === "duration-short") {
      result.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    if (sort === "duration-long") {
      result.sort(
        (a, b) =>
          b.duration - a.duration
      );
    }

    return result;
  }, [
    services,
    search,
    location,
    minPrice,
    maxPrice,
    availability,
    experience,
    skill,
    duration,
    sort,
  ]);

  // ================================
  // Clear Filters
  // ================================
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setAvailability("");
    setExperience("");
    setSkill("");
    setDuration("");
    setSort("recommended");
  };

  return (
    <div className="space-y-8">

      {/* =================================
          Filters
      ================================== */}
      <ServiceFilters
        search={search}
        location={location}
        minPrice={minPrice}
        maxPrice={maxPrice}
        availability={availability}
        experience={experience}
        skill={skill}
        duration={duration}
        sort={sort}
        locations={locations}
        skills={skills}
        onSearchChange={setSearch}
        onLocationChange={setLocation}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onAvailabilityChange={
          setAvailability
        }
        onExperienceChange={
          setExperience
        }
        onSkillChange={setSkill}
        onDurationChange={setDuration}
        onSortChange={setSort}
        onClear={clearFilters}
      />

      {/* =================================
          Results Header
      ================================== */}
      <div className="flex items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            OUR SERVICES
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Available Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredServices.length}
            </span>{" "}
            services
          </p>
        </div>

        {/* Total Services */}
        <div className="hidden rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 sm:block">
          {services.length} total
        </div>
      </div>

      {/* =================================
          Service Cards
      ================================== */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      ) : (
        /* =================================
            Empty State
        ================================== */
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
            <SearchX className="h-10 w-10 text-slate-400" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            No services found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn&apos;t find any services
            matching your current filters.
            Try changing your search or filter
            options.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}