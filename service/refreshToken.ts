"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    },
  );

//   console.log("Refresh response:", res.status, res.statusText);

  if (!res.ok) {
    const errorText = await res.text();

    console.log("Refresh error:", errorText);

    return {
      success: false,
      message: "Failed to refresh access token",
    };
  }

  const result = await res.json();

  return result;
};
