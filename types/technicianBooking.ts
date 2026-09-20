export type TechnicianBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface TechnicianBooking {
  id: string;

  bookingDate: string;

  status: TechnicianBookingStatus;

  totalAmount: number;

  service: {
    id: string;
    title: string;
  };

  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

  createdAt: string;
}