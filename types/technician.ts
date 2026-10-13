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