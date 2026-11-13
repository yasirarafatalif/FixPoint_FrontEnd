
import {
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Clock,
  Headphones,
  ThumbsUp,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    description:
      "Connect with professionals who are committed to delivering quality service.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BadgeCheck,
    title: "Verified Technicians",
    description:
      "Find skilled service providers with professional profiles and service details.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Know the service pricing upfront without worrying about hidden charges.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    title: "Easy Scheduling",
    description:
      "Book services at a time that works best for your busy schedule.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Get assistance whenever you need help with your service experience.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: ThumbsUp,
    title: "Quality Experience",
    description:
      "Enjoy a simple booking process designed around your convenience.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Why FixItNow?
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Why Choose <span className="text-blue-600">Us?</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            We make finding and booking reliable home services
            easier, safer, and more convenient.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition-transform group-hover:scale-110`}
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
