export interface Review {
  id: string;

  bookingId: string;

  customerId: string;
  technicianId: string;

  customer?: {
    id: string;
    name: string;
    avatar?: string;
  };

  rating: number;

  comment: string;

  createdAt: string;
  updatedAt: string;
}