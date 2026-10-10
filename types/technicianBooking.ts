import { User } from "./authTypes";
import { Service } from "./service";

export type TechnicianBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "IN_PROGRESS"
  | "PAID"
  | "REQUESTED";

export interface TechnicianBooking {
  id: string;
  bookingDate: string;
  status: TechnicianBookingStatus;
  totalPrice: number;

  customerId: string;
  serviceId: string;
  technicianId: string;
  customer: User;
  service: Service;

  customerNote: string;

  paymentStatus: string;

  createdAt: string;
  updatedAt: string;
}
