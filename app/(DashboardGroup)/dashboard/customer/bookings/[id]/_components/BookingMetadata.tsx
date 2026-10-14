
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BookingMetadata({
  bookingId,
  createdAt,
}: {
  bookingId: string;
  createdAt: string;
}) {
  return (
    <>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-4 font-bold text-gray-900">
          Booking Information
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-gray-500">Created On</p>
            <p className="mt-1 font-medium text-gray-900">{createdAt}</p>
          </div>

          <div>
            <p className="text-gray-500">Booking Reference</p>
            <p className="mt-1 break-all font-medium text-gray-900">
              {bookingId}
            </p>
          </div>
        </div>
      </section>

      <Link
        href="/dashboard/customer/bookings"
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        View All Bookings
        <ArrowUpRight size={17} />
      </Link>
    </>
  );
}
