import { Service } from "./service";
import { User } from "./user";


export type setTechnicianProfile = {
  experience: number;
  bio: string;
  location: string;
  skills: string[];
};
export interface TechnicianProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  address: string;
  bio: string;
  status: string;
  experience: number;
  location: string;
  skills: string[];
  role: "TECHNICIAN";
  isAvailable: boolean;
}


export interface TechnicianAvailability {
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
}





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
