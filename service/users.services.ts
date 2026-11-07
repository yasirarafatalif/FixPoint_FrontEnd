"use server";
import { cookies } from "next/headers";

export async function checkUserBlockStatus() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Please log in to continue.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Unable to verify account status.",
      };
    }

    // Check user status
    if (data?.data?.status === "BLOCKED") {
      return {
        success: false,
        isBlocked: true,
        message: "Your account has been blocked. Please contact support.",
      };
    }

    return {
      success: true,
      isBlocked: false,
      data: data.data,
      message: "Account is active.",
    };

  } catch (error) {
    console.error("Check user block status error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}