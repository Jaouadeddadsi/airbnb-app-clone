"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon }) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-2
      "
    >
      <Icon size={28} />
      <div className="text-base font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
