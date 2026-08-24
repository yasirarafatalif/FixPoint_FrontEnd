"use client";

import {
  Clock3,
  Search,
  SlidersHorizontal,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

interface ServiceFiltersProps {
  search: string;
  location: string;
  maxPrice: string;
  minPrice: string;
  availability: string;
  experience: string;
  skill: string;
  duration: string;
  sort: string;

  locations: string[];
  skills: string[];

  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onSkillChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onClear: () => void;
}

export default function ServiceFilters({
  search,
  location,
  minPrice,
  maxPrice,
  availability,
  experience,
  skill,
  duration,
  sort,
  locations,
  skills,
  onSearchChange,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onAvailabilityChange,
  onExperienceChange,
  onSkillChange,
  onDurationChange,
  onSortChange,
  onClear,
}: ServiceFiltersProps) {
  const hasFilters =
    search ||
    location ||
    minPrice ||
    maxPrice ||
    availability ||
    experience ||
    skill ||
    duration;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <SlidersHorizontal className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Find a service
            </h2>

            <p className="text-xs text-slate-500">
              Filter services based on your needs
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search service, technician or skill..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Location */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Location
          </label>

          <select
            value={location}
            onChange={(e) =>
              onLocationChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              All locations
            </option>

            {locations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Skill */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Service skill
          </label>

          <select
            value={skill}
            onChange={(e) =>
              onSkillChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              All skills
            </option>

            {skills.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Availability
          </label>

          <select
            value={availability}
            onChange={(e) =>
              onAvailabilityChange(
                e.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              Any availability
            </option>

            <option value="available">
              Available now
            </option>

            <option value="unavailable">
              Currently unavailable
            </option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600">
            <UserRound className="h-3.5 w-3.5" />
            Experience
          </label>

          <select
            value={experience}
            onChange={(e) =>
              onExperienceChange(
                e.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              Any experience
            </option>

            <option value="1">
              1+ years
            </option>

            <option value="3">
              3+ years
            </option>

            <option value="5">
              5+ years
            </option>

            <option value="10">
              10+ years
            </option>
          </select>
        </div>

        {/* Minimum Price */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Minimum price
          </label>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) =>
              onMinPriceChange(e.target.value)
            }
            placeholder="৳ 0"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label className="mb-2 block text-xs font-bold text-slate-600">
            Maximum price
          </label>

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) =>
              onMaxPriceChange(e.target.value)
            }
            placeholder="৳ 5000"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600">
            <Clock3 className="h-3.5 w-3.5" />
            Duration
          </label>

          <select
            value={duration}
            onChange={(e) =>
              onDurationChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">
              Any duration
            </option>

            <option value="60">
              Up to 1 hour
            </option>

            <option value="120">
              Up to 2 hours
            </option>

            <option value="180">
              Up to 3 hours
            </option>

            <option value="240">
              Up to 4 hours
            </option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-600">
            <Wrench className="h-3.5 w-3.5" />
            Sort by
          </label>

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="recommended">
              Recommended
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="experience">
              Most Experienced
            </option>

            <option value="duration-short">
              Shortest Duration
            </option>

            <option value="duration-long">
              Longest Duration
            </option>
          </select>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {hasFilters && (
        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
          <span className="h-2 w-2 rounded-full bg-blue-500" />

          <p className="text-xs font-medium text-slate-500">
            Filters are active
          </p>
        </div>
      )}
    </div>
  );
}