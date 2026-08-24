export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Booking {
  id: string;

  customerId: string;
  technicianId: string;
  serviceId: string;

  customer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };

  technician?: {
    id: string;
    name: string;
    avatar?: string;
  };

  service?: {
    id: string;
    title: string;
    image?: string;
  };

  bookingDate: string;

  startTime: string;
  endTime: string;

  location: string;
  address?: string;

  price: number;

  status: BookingStatus;

  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";

  paymentMethod?: "STRIPE" | "SSLCOMMERZ";

  notes?: string;

  createdAt: string;
  updatedAt: string;
}