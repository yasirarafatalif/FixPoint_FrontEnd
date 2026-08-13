"use server";

import { cookies } from "next/headers";

export const adminGetUser = async () => {
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to get user profile",
        data: null,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("adminGetUser error:", error);

    return {
      success: false,
      message: "Something went wrong!",
      data: null,
    };
  }
};
export const adminGetBookings = async () => {
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to get user profile",
        data: null,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("adminGetUser error:", error);

    return {
      success: false,
      message: "Something went wrong!",
      data: null,
    };
  }
};