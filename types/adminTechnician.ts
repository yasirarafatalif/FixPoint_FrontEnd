export type TechnicianStatus = "ACTIVE" | "INACTIVE";

export interface AdminTechnician {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  address: string;
  status: TechnicianStatus;
  createdAt: string;

  technicianProfile?: {
    bio: string;
    experience: number;
    location: string;
    skills: string[];
    isAvailable: boolean;
  };
}