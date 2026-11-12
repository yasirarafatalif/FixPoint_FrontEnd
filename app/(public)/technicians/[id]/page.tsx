import { notFound } from "next/navigation";
import TechnicianProfileClient from "../_components/TechnicianProfileClient";
import { getTechnician } from "@/service/technicianService";

export const metadata = {
  title: "FixtItNow | Technician Profile",
  description: "View technician details and availability",
};

export default async function TechnicianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technician = await getTechnician(id);

  return <TechnicianProfileClient technician={technician.data} />;
}
