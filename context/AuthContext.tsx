
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";


import type {
  LoginPayload,
  User,
} from "@/types/authTypes";
import { authService } from "@/service/authService";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;

  login: (payload: LoginPayload) => Promise<User>;

  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // ===============================
  // LOAD USER
  // ===============================
  useEffect(() => {
    const loadUser = async () => {
      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response =
          await authService.getMe();

        if (response?.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );

        localStorage.removeItem(
          "accessToken"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // ===============================
  // LOGIN
  // ===============================
  const login = async (
    payload: LoginPayload
  ): Promise<User> => {
    const response =
      await authService.login(payload);

    // তোমার backend response অনুযায়ী
    // এটা পরে adjust করা লাগতে পারে
    const accessToken =
      response.data?.accessToken;

    const loggedInUser =
      response.data?.user;

    if (!accessToken || !loggedInUser) {
      throw new Error(
        "Invalid login response"
      );
    }

    // Token save
    localStorage.setItem(
      "accessToken",
      accessToken
    );

    // User save
    setUser(loggedInUser);

    return loggedInUser;
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    localStorage.removeItem("accessToken");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===============================
// CUSTOM HOOK
// ===============================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

