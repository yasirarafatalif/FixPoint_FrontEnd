import { notFound } from "next/navigation";
import TechnicianProfileClient from "../_components/TechnicianProfileClient";

async function getTechnician(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/${id}`,
      {
        cache: "no-store",
      }
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
}

export default async function TechnicianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const technician = await getTechnician(id);

  if (!technician) {
    notFound();
  }

  return (
    <TechnicianProfileClient technician={technician} />
  );
}