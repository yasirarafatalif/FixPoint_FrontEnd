
import { getMe } from "@/service/getme";
import ProfileUpdateForm from "../../_components/shared/ProfileUpdateFrom";


export const metadata = {
  title: "FixItNow | User Profile",
  description: "Manage your user profile.",
};

const CustomerProfilePage = async () => {
  const profile = await getMe();
  // console.log(profile.data.data)

  if (!profile.data) return null;

  return <ProfileUpdateForm profile={profile.data.data} />;
};

export default CustomerProfilePage;
