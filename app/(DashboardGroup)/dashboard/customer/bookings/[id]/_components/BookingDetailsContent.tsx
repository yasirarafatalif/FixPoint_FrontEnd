
import BookingDetailsHeader from "./BookingDetailsHeader";
import BookingProgress from "./BookingProgress";
import TechnicianInfo from "./TechnicianInfo";
import ServiceLocation from "./ServiceLocation";
import PaymentSummary from "./PaymentSummary";
import BookingMetadata from "./BookingMetadata";
import type { BookingDetailsData } from "./bookingDetails.types";

export default function BookingDetailsContent({
  booking,
  bookingId,
}: {
  booking: BookingDetailsData;
  bookingId: string;
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BookingDetailsHeader booking={booking} bookingId={bookingId} />

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <BookingProgress status={booking.status} />
            <TechnicianInfo technician={booking.technician} />
            <ServiceLocation
              location={booking.location}
              customerNote={booking.customerNote}
            />
          </div>

          <aside className="space-y-6">
            <PaymentSummary booking={booking} bookingId={bookingId} />
            <BookingMetadata
              bookingId={bookingId}
              createdAt={booking.createdAt}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
