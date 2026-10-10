"use client";

import { CalendarDays, Check, UserRound, X } from "lucide-react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { updateTechnicianBookingStatus } from "@/service/technicianService";

import type {
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/technicianBooking";

interface Props {
  bookings: TechnicianBooking[];
}

export default function BookingTable({ bookings }: Props) {
  const router = useRouter();

  const handleStatusChange = async (
    bookingId: string,
    status: TechnicianBookingStatus,
  ) => {
    const result = await Swal.fire({
      title:
        status === "ACCEPTED"
          ? "Accept booking?"
          : status === "COMPLETED"
            ? "Complete booking?"
            : "Cancel booking?",

      text:
        status === "ACCEPTED"
          ? "This booking will be accepted."
          : status === "COMPLETED"
            ? "This booking will be marked as completed."
            : "This booking will be declined.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText:
        status === "ACCEPTED" || status === "PAID" || status === "IN_PROGRESS"
          ? "Yes, Accept"
          : status === "COMPLETED"
            ? "Yes, Complete"
            : "Yes, Decline",

      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const response = await updateTechnicianBookingStatus(bookingId, status);

    if (!response.success) {
      await Swal.fire({
        title: "Failed!",
        text: response.message,
        icon: "error",
      });

      return;
    }

    await Swal.fire({
      title: "Success!",
      text: "Booking status updated successfully.",
      icon: "success",
    });

    router.refresh();
  };

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <CalendarDays size={28} className="text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-900">No bookings found</h3>

        <p className="mt-1 text-sm text-slate-500">
          You don't have any matching bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[950px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
            <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
              Customer
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
              Service
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
              Booking Date
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
              Amount
            </th>

            <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
              Status
            </th>

            <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="transition hover:bg-slate-50/70">
              {/* Customer */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserRound size={16} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {booking.customer?.name || "Unknown"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {booking.customer?.email || "No email"}
                    </p>
                  </div>
                </div>
              </td>

              {/* Service */}
              <td className="px-5 py-4">
                <p className="font-medium text-slate-800">
                  {booking.service?.title || "Unknown service"}
                </p>
              </td>

              {/* Date */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays size={14} />

                  {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>

              {/* Amount */}
              <td className="px-5 py-4 font-semibold text-slate-900">
                ৳{booking.totalPrice}
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <StatusBadge status={booking.status} />
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  {/* PENDING → Confirm / Cancel */}
                  {booking.status === "REQUESTED" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(booking.id, "ACCEPTED")
                        }
                        title="Confirm booking"
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                      >
                        Accept
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(booking.id, "DECLINED")
                        }
                        title="Cancel booking"
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {/* ACCEPTED → In-Progress */}
                  {booking.status === "ACCEPTED" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (booking.paymentStatus !== "PAID") {
                          Swal.fire({
                            title: "Payment Required!",
                            text: "Customer has not paid yet. You cannot start this booking.",
                            icon: "warning",
                            confirmButtonText: "OK",
                          });
                          return;
                        }

                        handleStatusChange(booking.id, "IN_PROGRESS");
                      }}
                      title="Start booking"
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                    >
                      In-Progress
                    </button>
                  )}

                  {/* ACCEPTED → In-Progress */}
                  {/* {booking.status === "PAID" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(booking.id, "IN_PROGRESS")
                        }
                        title="Complete booking"
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                      >
                        In-Progress
                      </button>
                    </>
                  )} */}

                  {/* ACCEPTED → In-Progress */}
                  {booking.status === "PAID" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(booking.id, "IN_PROGRESS")
                        }
                        title="Complete booking"
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                      >
                        In-Progress
                      </button>
                    </>
                  )}

                  {/* IN_PROGRESS → No action */}
                  {booking.status === "IN_PROGRESS" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(booking.id, "COMPLETED")
                        }
                        title="Complete booking"
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                      >
                        Complete
                      </button>
                    </>
                  )}

                  {/* CANCELLED → No action */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: TechnicianBookingStatus }) {
  const styles = {
    PENDING: "border-amber-100 bg-amber-50 text-amber-700",
    REQUESTED: "border-amber-100 bg-amber-50 text-amber-700",

    ACCEPTED: "border-blue-100 bg-blue-50 text-blue-700",

    COMPLETED: "border-emerald-100 bg-emerald-50 text-emerald-700",
    IN_PROGRESS: "border-emerald-100 bg-emerald-50 text-emerald-700",
    PAID: "border-emerald-100 bg-emerald-50 text-emerald-700",

    DECLINED: "border-red-100 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
