"use server";

import { cookies } from "next/headers";
import type { AdminCategory } from "@/types/adminCategory";

export const getAllAdminCategories = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch categories",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as AdminCategory[],
    };
  } catch (error) {
    console.error("Get categories error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};

export const createAdminCategory = async (
  name: string,
  description: string
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create category",
      };
    }

    return result;
  } catch (error) {
    console.error("Create category error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};