"use server";

import { cookies } from "next/headers";

export const getSingleService = async (serviceId: string) => {
  console.log(serviceId);
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`;

    console.log("Request URL:", url);

    const res = await fetch(
      url,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        cache: "no-store",
      },
    );

    console.log("Response status:", res);

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to fetch service",
      };
    }

    const service = await res.json();

    console.log("Service response:", service);

    return {
      success: true,
      data: service,
      message: "Service fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching service:", error);

    return {
      success: false,
      data: null,
      message: "Failed to fetch service",
    };
  }
};
