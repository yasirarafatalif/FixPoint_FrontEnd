
import {
  Clock3,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Service } from "./ServicesClient";
import { toast } from "sonner";

type Props = {
  services: Service[];
};

const ServiceTable = ({ services }: Props) => {
  const handleEdit = (serviceId: string) => {
    // Handle edit action for the service with the given serviceId
    toast.info("Edit functionality is coming soon!");
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Service List
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          All services added to your profile.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Duration</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="max-w-xs px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {service.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {service.description}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                      {service.categoryId}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    ৳ {service.price.toLocaleString("en-US")}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={15} />
                      {service.duration} min
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        service.isActive
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => handleEdit(service.id)}
                        
                        title="Edit coming soon"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(service.id)}
                        
                        title="Delete coming soon"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-slate-100 p-4">
                      <Eye size={25} className="text-slate-400" />
                    </div>

                    <p className="font-semibold text-slate-700">
                      No services found
                    </p>

                    <p className="text-xs text-slate-500">
                      Try changing your search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
        Showing {services.length} services
      </div>
    </div>
  );
};

export default ServiceTable;
