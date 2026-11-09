import { UserRound } from "lucide-react";

interface ProfileAvatarProps {
  image: string;
  name: string;
}

export default function ProfileAvatar({
  image,
  name,
}: ProfileAvatarProps) {
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-violet-50 text-violet-600 shadow-sm">
      {image ? (
        <img
          src={image}
          alt={name || "Technician profile"}
          className="h-full w-full object-cover"
        />
      ) : (
        <UserRound size={38} />
      )}
    </div>
  );
}