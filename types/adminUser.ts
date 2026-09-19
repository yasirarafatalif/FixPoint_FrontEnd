export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updateAt: string;
}