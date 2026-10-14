import { RefreshCw } from "lucide-react";

type DashboardFeedbackProps = {
  loading: boolean;
  error: string;
  onRetry: () => void;
};

export default function DashboardFeedback({
  loading,
  error,
  onRetry,
}: DashboardFeedbackProps) {
  return (
    <>
      {loading && (
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm font-medium text-blue-700">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading your bookings...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="font-bold text-red-700">
            Could not load your bookings
          </p>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      )}
    </>
  );
}