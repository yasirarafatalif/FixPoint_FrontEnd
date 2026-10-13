"use server";

import { cookies } from "next/headers";
import type { TechnicianProfile } from "@/types/technician";

interface DecodedToken {
  id: string;
  role: string;
}

import type {
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/technicianBooking";
import { jwtUtils } from "@/utils/jwt";
import { User } from "@/types/user";

interface DecodedToken {
  id: string;
  role: string;
}

export const technicianGetProfile = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    // Decode access token

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch technician profile",
        data: null,
      };
    }
    return {
      success: true,
      message: result.message,
      data: result.data as User,
    };
  } catch (error) {
    console.error("Get technician profile error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getTechnicianProfile = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch technician profile",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as TechnicianProfile,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getTechnicianAvailability = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch availability",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getTechnicianBookings = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch bookings",
        data: [],
      };
    }
    console.log(result.data);

    return {
      success: true,
      message: result.message,
      data: result.data as TechnicianBooking[],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};

export const updateTechnicianBookingStatus = async (
  bookingId: string,
  status: TechnicianBookingStatus,
) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update booking",
      };
    }

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateTechnicianProfile = async (data: {
  name?: string;
  phone?: string;
  address?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/manege-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Update technician profile error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateTechnicianAvailability = async (data: {
  day: string;
  startTime: string;
  endTime: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Please login again." };
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/technician/availability`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: `Backend error: HTTP ${response.status}. Terminal-এর Availability response দেখো।`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `Request failed: ${response.status}`,
      };
    }

    return {
      success: true,
      message: result.message || "Availability updated successfully!",
      data: result.data,
    };
  } catch (error) {
    console.error("Availability request failed:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown request error",
    };
  }
};
