"use server";

import { cookies } from "next/headers";
export const getAllServices = async () => {
    
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const services = await res.json();
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}