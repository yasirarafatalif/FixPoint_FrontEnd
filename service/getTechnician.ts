
"use server";
export const getTechnician = async (technicianId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/${technicianId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Failed to fetch technician:", error);
    return null;
  }
};
