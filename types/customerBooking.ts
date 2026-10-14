export interface CustomerBooking {
  id: string;
  bookingDate: string;
  status: string;
  totalPrice: number | string;
  createdAt?: string;

  service?: {
    id?: string;
    title?: string;
    name?: string;
  } | null;

  services?: {
    id?: string;
    title?: string;
    name?: string;
  } | null;

  payment?: {
    status?: string;
  } | null;

  payments?: {
    status?: string;
  } | null;
}