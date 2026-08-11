import Cookies from "js-cookie";

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const setAuth = (token: string, user: User): void => {
  Cookies.set("token", token, {
    expires: 7,
    sameSite: "lax",
  });

  Cookies.set("user", JSON.stringify(user), {
    expires: 7,
    sameSite: "lax",
  });
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const getUser = (): User | null => {
  const user = Cookies.get("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

export const logout = (): void => {
  Cookies.remove("token");
  Cookies.remove("user");
};