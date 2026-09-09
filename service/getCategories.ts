"use server";

import api from "@/lib/app";
import { cookies } from "next/headers";
export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();
    return {
      success: true,
      data: data.data,
      message: "Categories fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch categories",
    };
  }
};
