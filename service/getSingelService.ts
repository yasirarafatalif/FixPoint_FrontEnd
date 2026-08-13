"use server";

export const getSingleService = async (
  serviceId: string
) => {
    console.log(serviceId);

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`;

    console.log("Request URL:", url);

    const res = await fetch(url,
        
        {
      cache: "no-store",
      method: "GET",
    });

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