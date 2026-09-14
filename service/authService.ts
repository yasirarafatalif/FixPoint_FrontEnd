
import axiosInstance from "@/lib/axiosInstance";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/authTypes";

export const authService = {
  // ===============================
  // REGISTER
  // ===============================
  register: async (
    payload: RegisterPayload
  ) => {
    const response =
      await axiosInstance.post<AuthResponse>(
        "/auth/register",
        payload
      );

    return response.data;
  },

  // ===============================
  // LOGIN
  // ===============================
  login: async (
    payload: LoginPayload
  ) => {
    const response =
      await axiosInstance.post<AuthResponse>(
        "/auth/login",
        payload
      );

    return response.data;
  },

  // ===============================
  // GET CURRENT USER
  // ===============================
  getMe: async () => {
    const response =
      await axiosInstance.get(
        "/auth/me"
      );

    return response.data;
  },
};
