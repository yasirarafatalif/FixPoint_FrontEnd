"use server";

import { cookies } from "next/headers";

export const adminUpdateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BLOCKED",
) => {
  const cookieStore = await cookies();


  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        status,
      }),
      cache: "no-store",
    },
  );
//   console.log(response)

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to update user status",
    };
  }

  return result;
};
