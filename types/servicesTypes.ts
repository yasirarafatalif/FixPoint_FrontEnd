export interface Category {
  id: string; 
  name: string;
}

export interface Technician {
  id: string;
  bio: string;
  experience: number;
  isAvailable: boolean;
  location: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
  categoryId: string;
  technicianId: string;
  technician: Technician;
}