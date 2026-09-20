"use server";

import { cookies } from "next/headers";
import type { AdminTechnician } from "@/types/adminTechnician";

export const getAllAdminTechnicians = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/bookings`,
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
        message:
          result.message ||
          "Failed to fetch technicians",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as AdminTechnician[],
    };
  } catch (error) {
    console.error(
      "Get admin technicians error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};