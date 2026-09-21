interface Booking {
  id: string;
  serviceName: string;
  customerName: string;
  bookingDate: string;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}