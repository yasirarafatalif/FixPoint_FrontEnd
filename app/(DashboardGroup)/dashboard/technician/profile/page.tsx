import { getTechnicianProfile } from "@/service/technicianService";
import TechnicianProfileForm from "./_components/TechnicianProfileForm";

export const metadata = {
  title: "FixItNow | Technician Profile",
  description: "Manage your technician profile.",
};

const TechnicianProfilePage = async () => {
  const profile = await getTechnicianProfile();

  if (!profile.data) return null;

  return <TechnicianProfileForm profile={profile.data} />;
};

export default TechnicianProfilePage;
