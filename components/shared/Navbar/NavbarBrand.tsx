
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function NavbarBrand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 text-white shadow-md transition-all group-hover:shadow-blue-500/30">
        <Wrench className="h-5 w-5" />
      </div>

      <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        FixIt<span className="text-blue-600">Now</span>
      </span>
    </Link>
  );
}

