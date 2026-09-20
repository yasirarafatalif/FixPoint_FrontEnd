"use server";

import { cookies } from "next/headers";
import type { AdminBooking } from "@/types/adminBooking";

export const getAllAdminBookings = async () => {
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
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
          result.message || "Failed to fetch bookings",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as AdminBooking[],
    };
  } catch (error) {
    console.error("Get admin bookings error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};