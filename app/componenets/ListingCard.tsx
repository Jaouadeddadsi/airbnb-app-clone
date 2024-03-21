"use client";

import Image from "next/image";

import { SafeListing, SafeUser } from "../types";
import useCountries from "../hooks/useCountries";
import HeartButton from "./HeartButton";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
  reservationId?: string;
  actionLabel?: string;
  deleteProperty?:boolean
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  startDate,
  endDate,
  totalPrice,
  reservationId,
  actionLabel,
  deleteProperty=false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { getByValue } = useCountries();
  const router = useRouter();
  const country = getByValue(data.locationValue);

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsLoading(true);
      axios
        .delete(`/api/reservation/${reservationId}`)
        .then(() => {
          router.refresh();
          toast.success("Reservation canceled");
        })
        .catch(() => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [reservationId]
  );

  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => { 
      e.stopPropagation();
      setIsLoading(true);
      axios.delete(`/api/listing/${data.id}`)
      .then(() => {
        router.refresh();
        toast.success("Property deleted")
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false)
      })
    }, [data.id]
  )

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
      {reservationId && actionLabel && (
        <Button
          actionLabel={actionLabel}
          action={onCancel}
          disabled={isLoading}
        />
      )}
      { deleteProperty && (
        <Button
          actionLabel="Delete Property"
          action={onDelete}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default ListingCard;
