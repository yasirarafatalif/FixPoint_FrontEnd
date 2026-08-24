import { Service } from "./service";
import { User } from "./user";

export interface Technician {
  id: string;

  userId: string;
  user: User;

  bio?: string;

  skills: string[];

  hourlyRate: number;

  experienceYears: number;

  location?: string;

  latitude?: number;
  longitude?: number;

  profileImage?: string;

  rating: number;
  totalReviews: number;

  services?: Service[];

  isAvailable: boolean;

  createdAt: string;
  updatedAt: string;
}