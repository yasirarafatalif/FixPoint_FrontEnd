import { notFound } from "next/navigation";
import TechnicianProfileClient from "../_components/TechnicianProfileClient";
import { getTechnician } from "@/service/getTechnician";



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