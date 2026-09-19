"use server";

import { cookies } from "next/headers";
import type { UserRole } from "@/types/authTypes";
import { AdminUser } from "@/types/adminUser";


export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: AdminUser[] | null;
}

export const getAllAdminUsers = async (): Promise<GetUsersResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
      data: null,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch users",
        data: null,
      };
    }

    const users = Array.isArray(result.data) ? result.data : [];

    return {
      success: true,
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error) {
    console.error("getAllAdminUsers error:", error);
    return {
      success: false,
      message: "Something went wrong!",
      data: null,
    };
  }
};

export const banUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/ban`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to ban user" };
    }

    return { success: true, message: result?.message || "User banned successfully" };
  } catch (error) {
    console.error("banUser error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const unbanUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/unban`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to unban user" };
    }

    return { success: true, message: result?.message || "User unbanned successfully" };
  } catch (error) {
    console.error("unbanUser error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const createAdminUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<{ success: boolean; message: string }> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result?.message || "Failed to create user" };
    }

    return { success: true, message: result?.message || "User created successfully" };
  } catch (error) {
    console.error("createAdminUser error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
