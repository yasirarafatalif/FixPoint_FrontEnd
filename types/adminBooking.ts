export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminBooking {
  id: string;
  bookingDate: string;
  status: BookingStatus;
  totalAmount: number;

  service: {
    id: string;
    title: string;
  };

  customer: {
    id: string;
    name: string;
    email: string;
  };

  technician: {
    id: string;
    name: string;
    email: string;
  };

  createdAt: string;
}