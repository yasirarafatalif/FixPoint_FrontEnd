
import ProfileUpdateForm from "../../_components/shared/ProfileUpdateFrom";
import { getMe } from "@/service/getme";

export const metadata = {
  title: "FixItNow | Technician Profile",
  description: "Manage your technician profile.",
};

const TechnicianProfilePage = async () => {
  const profile = await getMe();
  if (!profile.data) return null;

  return <ProfileUpdateForm profile={profile.data.data} />;
};

export default TechnicianProfilePage;
