import { getAllServices } from "@/service/getAllServices";
import { getCategories } from "@/service/getCategories";
import type { Service as ServicesClientService } from "@/types/servicesTypes";
import ServicesClient from "./_components/ServicesClient";

export default async function ServicesPage() {
  const result = await getAllServices();
  const categoriesResult = await getCategories();
  console.log(result.data)
  // console.log(categoriesResult.data)


  const services = Array.isArray(result?.data) ? result?.data : [];
 const categories = Array.isArray(categoriesResult?.data)
  ? categoriesResult.data
  : Array.isArray(categoriesResult?.data)
  ? categoriesResult.data
  : Array.isArray(categoriesResult)
  ? categoriesResult
  : [];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Minimal Clean Header without extra text */}
      <div className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Services & Technicians
          </h1>
        </div>
      </div>

      {/* Filter & Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ServicesClient
          services={services as unknown as ServicesClientService[]}
          categories={categories}
        />
      </div>
    </main>
  );
}