"use server";

import api from "@/lib/app";
import { cookies } from "next/headers";
export const getAllServices = async () => {

  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
    //   cache: "no-store",
    // });
    const res = await api.get("/api/services",{
      headers: {
        Authorization: `Bearer ${(await cookies()).get("token")?.value}`,
      },
    });
    console.log(res)

    // if (!res.ok) {
    //   return { success: false, data: null, message: "Failed to fetch services" };
    // }

    // const services = await res.json();
    // return { success: true, data: services, message: "Services fetched successfully" };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, data: null, message: "Failed to fetch services" };
  }
}