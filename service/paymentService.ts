
"use server";

import { cookies } from "next/headers";

export async function createPayment(bookingId: string) {
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

    if (!baseUrl) {
      return {
        success: false,
        message: "API URL is not configured.",
      };
    }

    const response = await fetch(
      `${baseUrl}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Unable to initiate payment.",
      };
    }

    // Backend service returns { paymentUrl: ... }.
    const paymentUrl =
      result.data?.paymentUrl ??
      result.paymentUrl;

    if (!paymentUrl) {
      console.error("Payment API response:", result);

      return {
        success: false,
        message: "Payment URL was not returned by the server.",
      };
    }

    return {
      success: true,
      paymentUrl,
    };
  } catch (error) {
    console.error("Create payment error:", error);

    return {
      success: false,
      message: "Unable to connect to the payment service.",
    };
  }
}



export async function getMyPayments() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Please log in to view your payments.",
        data: [],
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      return {
        success: false,
        message: "API URL is not configured.",
        data: [],
      };
    }

    const response = await fetch(`${baseUrl}/api/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      return {
        success: false,
        message: result.message || "Unable to load payments.",
        data: [],
      };
    }

    const payments = Array.isArray(result.data) ? result.data : [];

    return {
      success: true,
      message: result.message || "Payments loaded successfully.",
      data: payments,
    };
  } catch (error) {
    console.error("Get payments error:", error);

    return {
      success: false,
      message: "Unable to load payment history.",
      data: [],
    };
  }
}

