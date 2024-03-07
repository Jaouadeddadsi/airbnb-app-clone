"use client";

import Image from "next/image";
import { useMemo } from "react";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import HeartButton from "../HeartButton";
import useFavorite from "@/app/hooks/useFavorite";

interface ListingHeadProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ listing, currentUser }) => {
  const { getByValue } = useCountries();
  const country = getByValue(listing.locationValue);
  
  const favorite = useFavorite({
    listingId:listing.id, 
    currentUser: currentUser
  })

  return (
    <div
      className="
        flex
        flex-col
        gap-2
      "
    >
      <div className="font-bold text-2xl">{listing.title}</div>
      <div className="text-neutral-400">
        {country?.region}, {country?.label}
      </div>
      <div
        className="
        mt-4
        relative 
        w-full 
        aspect-video
        overflow-hidden
        rounded-xl
        "
      >
        <Image
          alt="listing"
          src={listing.imageSrc}
          fill
          className="object-cover"
        />
        <div>
          <HeartButton
            favorite={favorite}
            listingId={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
