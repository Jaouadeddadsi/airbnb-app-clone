"use client";

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user: SafeUser;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  title: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  title,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const center = useMemo(() => {
    const country = getByValue(locationValue);
    return country?.latlng;
  }, [locationValue]);

  const Map = useMemo(() => {
    return dynamic(() => import("@/app/componenets/Map"), {
      ssr: false,
    });
  }, [locationValue]);

  return (
    <div className="col-span-4 order-2 md:order-1">
      <div
        className="
              flex 
              flex-row 
              gap-4
              items-center
            "
      >
        <div
          className="
                  font-semibold
                  text-xl
                "
        >
          Hosted by {user.name}
        </div>
        <Avatar imageSrc={user.image} />
      </div>
      <div
        className="
                mt-2
                flex
                flex-row
                gap-4
                text-gray-500
              "
      >
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr className="my-8" />
      {category && (
        <ListingCategory
          label={category.label}
          icon={category.icon}
          description={category.description}
        />
      )}
      <hr className="my-8" />
      <div className="text-gray-500">{title}</div>
      <hr className="my-8" />
      <Map center={center} />
    </div>
  );
};

export default ListingInfo;
