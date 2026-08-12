import { getAllServices } from "@/service/getAllServices";
import ServicesClient from "./_components/ServicesClient";


export default async function ServicesPage() {
  const result = await getAllServices();

  console.log("Services API:", result);

  const services = Array.isArray(result?.data)
    ? result.data
    : [];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg shadow-blue-600/30">
            🔧
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Find the Right{" "}
            <span className="text-blue-500">
              Professional
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Find trusted professionals for your home
            services. Search, compare and book the
            right technician.
          </p>

        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ServicesClient services={services} />
      </section>

    </main>
  );
}