"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import qs from "query-string";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is in the artic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const router = useRouter();

  const onClick = useCallback(
    (label: string) => {
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
    },
    [router, params]
  );
  return (
    <div
      className="
        flex
        flex-row
        flex-nowrap
        items-center
        justify-between
        gap-8
      "
    >
      {categories.map((category) => (
        <div
          onClick={() => {
            onClick(category.label);
          }}
          key={category.label}
          className={`
            cursor-pointer
          hover:text-black
            transition
            p-4
          border-b-2
          ${
            params.get("category") === category.label
              ? "text-black"
              : "text-neutral-500"
          }
          ${
            params.get("category") === category.label
              ? "border-b-black"
              : "border-b-transparent"
          }
          `}
        >
          <CategoryBox label={category.label} icon={category.icon} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
