import { CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Professional Service",
    description:
      "Your service will be handled by a professional technician.",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Choose a suitable date and time for your service.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Know the service price before confirming your booking.",
  },
  {
    title: "Secure Booking",
    description:
      "Your booking information is securely handled by FixItNow.",
  },
];

export default function ServiceFeatures() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-950">
        Why Choose FixItNow?
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="shrink-0 text-blue-600"
              />

              <h3 className="text-sm font-bold text-slate-800">
                {feature.title}
              </h3>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}