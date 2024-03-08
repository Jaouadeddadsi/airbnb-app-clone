"use client";
import Image from "next/image";

interface AvatarProps {
  imageSrc?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc }) => {
  return (
      <Image
        alt="avatar"
        width={35}
        height={35}
        className="rounded-full"
        src={imageSrc || "/images/placeholder.jpg"}
      />
  );
};

export default Avatar;
