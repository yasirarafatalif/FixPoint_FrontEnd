"use server";
import { Service } from "@/types/service";
import { cookies } from "next/headers";

export interface ServiceResponse {
  success: boolean;
  message?: string;
  data: Service[];
}

export const getAllServices = async (): Promise<ServiceResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();
  return {
    success: true,
    data: data.data,
    message: "Services fetched successfully",
  };
};

export const getSingleServicePublicUser = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
      {
        cache: "no-store",
      },
    );

    const service = await response.json();

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

export const getSingleService = async (serviceId: string) => {
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

