
import { ShieldCheck, UserRound, Wrench } from "lucide-react";
import { SectionTitle } from "./BookingDetailsPrimitives";
import type { BookingDetailsData } from "./bookingDetails.types";

export default function TechnicianInfo({
  technician,
}: {
  technician: BookingDetailsData["technician"];
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
      <SectionTitle icon={UserRound} title="Technician Information" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Wrench size={29} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {technician.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {technician.profession}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {technician.experience} · ★ {technician.rating}
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <ShieldCheck size={15} />
          Technician
        </span>
      </div>
    </section>
  );
}
