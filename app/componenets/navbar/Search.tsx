"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInCalendarDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const {getByValue} = useCountries()

  const location = useMemo(() => {
    const locationValue = params.get('locationValue')
    console.log(locationValue);
    
    if (!locationValue) {
      return "Anywhere"
    }
    return getByValue(locationValue)?.label
   }, [params, getByValue])

  const days = useMemo(() => { 
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    if (startDate && endDate) {
      const daysDifference = differenceInCalendarDays(
        new Date(endDate),
        new Date(startDate))
      return `${daysDifference} days` 
    }
    return "Any Week"
   }, [params])

  const guests = useMemo(() => {
    const guestCount = params.get("guestCount");
    if (guestCount) {
      return `${guestCount} Guests`
    }
    return "Add Guests"
   }, [params])
  return (
    <div
      onClick={searchModal.onOpen}
      className="
        flex
        flex-row
        border-[1px]
        border-neutral-200
        py-2
        px-4
        justify-between
        md:justify-center
        items-center
        shadow-sm
        hover:shadow-md
        transition
        rounded-full
        cursor-pointer
        relative
        grow
        md:grow-0
        text-sm
        font-semibold
      "
    >
      <div
        className="
        sm:border-e-[1px]
        border-neutral-200
        pe-6
        "
      >
        {location}
      </div>
      <div
        className="
        px-6
        hidden
        sm:block
        "
      >
        {days}
      </div>
      <div
        className="
        flex
        flex-row
        items-center
        "
      >
        <div
          className="
          border-s-[1px]
        border-neutral-200
        text-neutral-500
        ps-6
        pe-2
        hidden
        sm:block
        "
        >
          {guests}
        </div>
        <div
          className="
          p-2
          rounded-full
          bg-rose-500
          text-white
        "
        >
          <IoSearch size={20} />
        </div>
      </div>
    </div>
  );
};

export default Search;
