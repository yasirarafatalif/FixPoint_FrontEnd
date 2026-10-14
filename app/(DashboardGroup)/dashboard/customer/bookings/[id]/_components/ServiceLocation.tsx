
import { MapPin, MessageSquare } from "lucide-react";
import { SectionTitle } from "./BookingDetailsPrimitives";

export default function ServiceLocation({
  location,
  customerNote,
}: {
  location: string;
  customerNote: string;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
      <SectionTitle icon={MapPin} title="Service Location" />

      <p className="text-sm leading-6 text-gray-600">
        {location}
      </p>

      <div className="my-6 border-t border-gray-100" />

      <div className="mb-3 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Customer Note</h3>
      </div>

      <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-gray-600">
        {customerNote || "No note added."}
      </p>
    </section>
  );
}
