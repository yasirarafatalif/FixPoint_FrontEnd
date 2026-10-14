
import { CheckCircle2, Circle } from "lucide-react";
import { SectionTitle } from "./BookingDetailsPrimitives";

const steps = [
  { label: "Booking Requested", description: "Your booking was submitted." },
  { label: "Booking Accepted", description: "The technician accepted your booking." },
  { label: "Work In Progress", description: "The technician starts the service." },
  { label: "Completed", description: "The service is finished." },
];

export default function BookingProgress({
  status,
}: {
  status: string;
}) {
  const completedStep =
    status === "REQUESTED"
      ? 0
      : status === "ACCEPTED"
        ? 1
        : status === "IN_PROGRESS"
          ? 2
          : status === "COMPLETED"
            ? 3
            : -1;

  const isCancelled = ["CANCELLED", "CANCELED"].includes(status);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
      <SectionTitle icon={CheckCircle2} title="Booking Progress" />

      {isCancelled ? (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          This booking has been cancelled.
        </div>
      ) : (
        <div>
          {steps.map((step, index) => {
            const isComplete = index < completedStep;
            const isCurrent = index === completedStep;
            const isReached = index <= completedStep;

            return (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {isComplete || isCurrent ? (
                    <CheckCircle2
                      size={23}
                      className={`shrink-0 ${
                        isComplete ? "text-emerald-600" : "text-blue-600"
                      }`}
                    />
                  ) : (
                    <Circle size={23} className="shrink-0 text-gray-300" />
                  )}

                  {index !== steps.length - 1 && (
                    <div
                      className={`my-1 min-h-10 w-0.5 ${
                        isComplete ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                <div className="pb-7">
                  <p className={isReached ? "font-semibold text-gray-900" : "font-semibold text-gray-400"}>
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {step.description}
                  </p>
                  {isCurrent && (
                    <span className="mt-2 inline-block text-xs font-semibold text-blue-700">
                      Current status
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
