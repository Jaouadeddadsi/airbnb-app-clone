"use client";

import { IoMenu } from "react-icons/io5";
import Avatar from "../Avatar";

interface UserItemProps {
  imageSrc?: string | null;
} 

const UserItem:React.FC<UserItemProps> = ({imageSrc}) => {
  return (
    <button
      className="
        p-3
        md:p-0
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        hover:shadow-md
        transition
        flex
        flex-row
        items-center
        justify-center
        gap-2
        cursor-pointer
        rounded-full
        relative
      "
    >
      <IoMenu size={24} className="text-neutral-500" />
      <div className="hidden md:block">
        <Avatar imageSrc={imageSrc}/>
      </div>
    </button>
  );
};

export default UserItem;
