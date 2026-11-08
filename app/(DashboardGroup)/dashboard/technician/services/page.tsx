
import {
  TechnicianGetCategories,
  TechnicianGetServices,
} from "@/service/technicianService";

import ServicesClient from "./_components/ServicesClient";

export const metadata = {
  title: "FixItNow | Technician Services",
  description: "Manage your services as a technician.",
};

const TechnicianServicesPage = async () => {
  const [categories, services] = await Promise.all([
    TechnicianGetCategories(),
    TechnicianGetServices(),
  ]);

  return (
    <ServicesClient
      categories={categories?.data ?? []}
      services={services?.data ?? []}
    />
  );
};

export default TechnicianServicesPage;
