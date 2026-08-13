import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSingleService } from "@/service/getSingelService";
import ServiceDetails from "@/app/technicians/_components/ServiceDetails";




interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailsPage({
  params,
}: PageProps) {
  const { id: serviceId } = await params;
 

  const result = await getSingleService(serviceId as string);
  console.log(result);

  if (!result.success) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 text-center">

          <div className="mb-4 text-6xl">
            🔍
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            Service not found
          </h1>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            The service you are looking for does not
            exist or may have been removed.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }


  const service = result?.data;

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Service not found
          </h1>

          <Link
            href="/services"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Back to services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

        </div>
      </div>

      <ServiceDetails service={service} />
    </main>
  );
}