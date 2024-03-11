"use client";

import Image from "next/image";

import { SafeListing, SafeUser } from "../types";
import useCountries from "../hooks/useCountries";
import HeartButton from "./HeartButton";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useFavorite from "../hooks/useFavorite";
import { format } from "date-fns";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  reservationId?: string  
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  startDate,
  endDate,
  totalPrice,
  reservationId
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { getByValue } = useCountries();
  const router = useRouter();
  const country = getByValue(data.locationValue);
  const favorite = useFavorite({
    listingId: data.id,
    currentUser: currentUser,
  });

  const onCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsLoading(true)
    axios.delete(`/api/reservation/${reservationId}`)
    .then(() => {
      router.refresh()
      toast.success("Reservation canceled")
    })
    .catch(() => {
      toast.error('Something went wrong!')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [reservationId])

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
        {startDate && endDate
          ? `${format(new Date(startDate), "MMM dd, yyyy")} - ${format(
              new Date(endDate),
              "MMM dd, yyyy"
            )}`
          : data.category}
      </div>
      <div className="font-semibold">
        $ {totalPrice ? totalPrice : data.price}{" "}
        {!totalPrice && <span className="font-normal text-sm">night</span>}
      </div>
      {reservationId && (
        <Button
        actionLabel="Cancel reservation"
        action={onCancel}
        disabled={isLoading}
      />
      )}
    </div>
  );
};

export default ListingCard;
