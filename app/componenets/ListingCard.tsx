"use client";

import Image from "next/image";

import { SafeListing, SafeUser } from "../types";
import useCountries from "../hooks/useCountries";
import HeartButton from "./HeartButton";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import useFavorite from "../hooks/useFavorite";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const { getByValue } = useCountries();
  const router = useRouter();

  const country = getByValue(data.locationValue);
  const favorite = useFavorite({
    listingId: data.id,
    currentUser: currentUser,
  });

  return (
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
      className="
        col-span-1
        flex
        flex-col
        gap-2
        group
        cursor-pointer
      "
    >
      <div
        className="
          relative
          w-full
          aspect-square
          overflow-hidden
          rounded-xl
        "
      >
        <Image
          alt="image"
          fill
          src={data.imageSrc}
          className="
              object-cover
              group-hover:scale-110
              transition
              duration-100
              ease-in
            "
        />
        <HeartButton
          favorite={favorite}
          listingId={data.id}
          currentUser={currentUser}
        />
      </div>
      <div
        className="
          text-lg
          font-semibold
        "
      >
        {country?.region}, {country?.label}
      </div>
      <div
        className="
          text-neutral-500
        "
      >
        {data.category}
      </div>
      <div className="font-semibold">
        $ {data.price} <span className="font-normal text-sm">night</span>
      </div>
    </div>
  );
};

export default ListingCard;
