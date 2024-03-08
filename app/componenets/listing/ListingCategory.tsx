"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string;
  description: string;
  icon: IconType
}

const ListingCategory:React.FC<ListingCategoryProps> = ({
  label,
  description,
  icon: Icon
}) => {
  return (
    <div
      className="
        flex
        flex-row
        gap-4
        items-center
      "
    >
      <Icon size={28}/>
      <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-gray-500">{description}</div>
      </div>
    </div>
  );
}
 
export default ListingCategory;