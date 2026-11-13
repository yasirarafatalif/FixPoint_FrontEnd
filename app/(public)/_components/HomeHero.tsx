
import {
  Search,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          <Sparkles size={16} />
          Your Home Service Partner
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Your Trusted{" "}
          <span className="text-blue-500">
            Home Service
          </span>{" "}
          Platform
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          Book qualified professionals for plumbing,
          electrical, cleaning, painting and more.
          Quality home services are just a click away.
        </p>

        <form
          action="/services"
          method="GET"
          className="mx-auto flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl md:flex-row"
        >
          <div className="flex flex-1 items-center border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r">
            <Search className="mr-3 h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="text"
              name="search"
              placeholder="What service do you need?"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-1 items-center px-4 py-3">
            <MapPin className="mr-3 h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="text"
              placeholder="Your location"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <span>✓ Verified Professionals</span>
          <span>✓ Quality Services</span>
          <span>✓ Easy Booking</span>
        </div>

      </div>
    </section>
  );
}
