import { UserRound } from "lucide-react";
import Image from "next/image";

interface ProfileAvatarProps {
  image: string;
  name: string;
  profileImage?: string;
}

export default function ProfileAvatar({
  image,
  name,
  profileImage,
}: ProfileAvatarProps) {
  // console.log(profileImage, "profileImage");
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-violet-50 text-violet-600 shadow-sm">
      {profileImage ? (
        <Image
          src={profileImage || image}
          alt={name || "Profile"}
          className="h-full w-full object-cover"
          width={96}
          height={96}
        />
      ) : (
        <UserRound size={38} />
      )}
    </div>
  );
}