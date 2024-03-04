"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon }) => {
  const params = useSearchParams();
  const router = useRouter();

  const onClick = useCallback(() => {
    let query;
    if (params) {
      query = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...query,
      category: label,
    };
    if (query?.category === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [router, params]);
  return (
    <div
      onClick={onClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        cursor-pointer
        hover:text-black
        transition
        p-4
        border-b-2
        ${params.get("category") === label ? "text-black" : "text-neutral-500"}
        ${
          params.get("category") === label
            ? "border-b-black"
            : "border-b-transparent"
        }
      `}
    >
      <Icon size={24} />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
