import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <p className="text-7xl font-bold">404</p>

        <h1 className="mt-4 text-2xl font-semibold">
          Page not found
        </h1>

        <p className="mt-2 text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}