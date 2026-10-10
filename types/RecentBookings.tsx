interface Booking {
  id: string;
  serviceName: string;
  customerName: string;
  bookingDate: string;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "ACCEPTED" | "COMPLETED" | "DECLINED" | "REQUESTED" | "REFUNDED" | "IN_PROGRESS" | "PAID";
}