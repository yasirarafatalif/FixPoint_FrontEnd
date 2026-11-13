
import {
  Search,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Service",
    description:
      "Browse our service categories and find the perfect professional for your needs.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Professional",
    description:
      "Choose your preferred technician, select a suitable time, and confirm your booking.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get the Job Done",
    description:
      "Sit back and relax while our skilled professionals take care of your problem.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8fafc] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <ClipboardList size={16} />
            Simple Process
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            How <span className="text-blue-600">FixItNow</span> Works
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 md:text-lg">
            Getting professional home services has never been easier.
            Just follow three simple steps.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-xl"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <span className="text-4xl font-bold text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>

                {index !== 2 && (
                  <div className="mt-7 hidden items-center gap-2 text-sm font-semibold text-blue-600 md:flex">
                    Step {index + 1}
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Explore Services
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
