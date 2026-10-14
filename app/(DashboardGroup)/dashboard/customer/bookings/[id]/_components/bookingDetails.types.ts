
export type BookingDetailsData = {
  serviceName: string;
  category: string;
  status: string;
  bookingDate: string;
  bookingTime: string;
  createdAt: string;
  customerNote: string;
  location: string;
  technician: {
    name: string;
    profession: string;
    experience: string;
    rating: string | number;
  };
  pricing: {
    serviceCharge: number;
    additionalCharge: number;
    total: number;
  };
  paymentStatus: string;
};
