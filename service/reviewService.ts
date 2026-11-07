"use server";

import { cookies } from "next/headers";

export async function submitCustomerReview(payload: {
  bookingId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
      return { success: false, message: "Please log in first." };
    }

    if (!baseUrl) {
      return { success: false, message: "API URL is not configured." };
    }

    const response = await fetch(`${baseUrl}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Unable to submit review.",
      };
    }

    return {
      success: true,
      message: result.message || "Review submitted successfully!",
    };
  } catch (error) {
    console.error("Submit review error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function getMyReviews() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Please log in to view your reviews.",
        data: [],
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch reviews.",
        data: [],
      };
    }
    console.log(result)

    return {
      success: true,
      message: result.message || "Reviews fetched successfully.",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong.",
      data: [],
    };
  }
}
