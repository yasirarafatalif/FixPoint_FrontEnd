export type TechnicianBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface TechnicianBooking {
  id: string;
  bookingDate: string;
  status: TechnicianBookingStatus;
  totalPrice: number;

  customerId: string;
  serviceId: string;
  technicianId: string;

  customerNote: string;

  paymentStatus: string;

  createdAt: string;
  updatedAt: string;
}