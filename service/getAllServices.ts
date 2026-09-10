"use server";
import { Service } from "@/types/service";

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

export const getSingleService = async (id: string) => {
  console.log(id)
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
