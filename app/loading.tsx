import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center bg-slate-50 px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="w-full max-w-xs rounded-2xl border border-slate-100 bg-white px-8 py-9 text-center shadow-sm">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <span
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600"
            aria-hidden="true"
          />
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
            <Wrench size={20} strokeWidth={2.5} />
          </span>
        </div>

        <h1 className="mt-6 text-lg font-semibold text-slate-900">Loading...</h1>
        <p className="mt-1.5 text-sm text-slate-500">Please wait a moment</p>
        <span className="sr-only">Loading content</span>
      </section>
    </main>
  );
}
