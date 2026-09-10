import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <SearchX className="h-10 w-10" />
        </div>

        <h1 className="mt-6 text-3xl font-black text-slate-900">
          Technician Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          The technician you are looking for doesn't exist
          or may no longer be available.
        </p>

        <Link
          href="/services"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Browse Services
        </Link>

      </div>
    </div>
  );
}