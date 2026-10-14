
"use server";

import { cookies } from "next/headers";

export interface CreateBookingPayload {
  serviceId: string;
  bookingDate: string;
  customerNote: string;
}

export const createBooking = async (
  payload: CreateBookingPayload,
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login before booking.",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Booking API returned non-JSON:", {
        status: response.status,
        url: response.url,
        body: text.slice(0, 500),
      });

      return {
        success: false,
        message: `Booking API error (HTTP ${response.status}). Check the booking endpoint.`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create booking.",
      };
    }

    return {
      success: true,
      message: result.message || "Booking request created successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create booking error:", error);

    return {
      success: false,
      message: "Unable to connect to the booking service.",
    };
  }
};



export const  getCustomerBookings = async()=> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please log in to view your bookings.",
        data: [],
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured.");
    }

    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();


    if (!response.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Failed to load bookings.",
        data: [],
      };
    }

    
    const bookings = Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.data?.data)
        ? result.data.data
        : [];

    return {
      success: true,
      message: result.message || "Bookings loaded successfully.",
      data: bookings,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      data: [],
    };
  }
}
