
"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import ServiceStats from "./ServiceStats";
import ServiceTable from "./ServiceTable";
import CreateServiceModal, {
  type CreateServicePayload,
} from "./CreateServiceModal";
import { TechnicianCreateService } from "@/service/technicianService";


export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
  technicianId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
};

export type Categories = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type ServicesClientProps = {
  categories?: Categories[];
  services?: Service[];
};

const ServicesClient = ({
  categories = [],
  services: initialServices = [],
}: ServicesClientProps) => {
  const [services, setServices] = useState(initialServices);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Filter Services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        service.title?.toLowerCase().includes(search) ||
        service.description?.toLowerCase().includes(search) ||
        service.category?.name?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && service.isActive) ||
        (statusFilter === "inactive" && !service.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [services, searchTerm, statusFilter]);

  // Service Statistics
  const activeServices = services.filter(
    (service) => service.isActive
  ).length;

  const inactiveServices = services.length - activeServices;

  // Open Create Modal
  const handleAddService = () => {
    setIsCreateModalOpen(true);
  };

  // Create New Service
  const handleCreateService = async (data: CreateServicePayload) => {
    try {
      setIsCreating(true);

      const response = await TechnicianCreateService(data);

      if (response?.success) {
        toast.success(
          response.message || "Service created successfully!"
        );

        // Add new service to table
        const newService = response.data;

        if (newService) {
          setServices((prev) => [newService, ...prev]);
        }

        setIsCreateModalOpen(false);
      } else {
        toast.error(response?.message || "Failed to create service.");
      }
    } catch (error: unknown) {
      console.error("Create Service Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating service.";

      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Services
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all the services you have added.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddService}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* Statistics */}
      <ServiceStats
        total={services.length}
        active={activeServices}
        inactive={inactiveServices}
      />

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Service Table */}
      <ServiceTable services={filteredServices} />

      {/* Empty Search Result */}
      {filteredServices.length === 0 && services.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-medium text-slate-600">
            No services found.
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or filter.
          </p>
        </div>
      )}

      {/* No Services */}
      {services.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-800">
            No services added yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Start by adding your first service.
          </p>

          <button
            type="button"
            onClick={handleAddService}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Your First Service
          </button>
        </div>
      )}

      {/* Create Service Modal */}
      {isCreateModalOpen && (
        <CreateServiceModal
          categories={categories}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateService}
        />
      )}
    </div>
  );
};

export default ServicesClient;
