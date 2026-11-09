export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  profileImage: string | null;
  status: string;
  role: string;
}

export interface updateProfile {
  name?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}