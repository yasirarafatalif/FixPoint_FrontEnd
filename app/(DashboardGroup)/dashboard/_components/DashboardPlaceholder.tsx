import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function DashboardPlaceholder({
  eyebrow,
  title,
  description,
  backHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backHref: string;
}) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-2xl items-center justify-center">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Construction size={26} />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p>
        <Link href={backHref} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">
          <ArrowLeft size={16} /> Back to overview
        </Link>
      </div>
    </section>
  );
}
