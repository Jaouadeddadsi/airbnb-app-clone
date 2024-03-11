"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Calendar from "../inputs/Calendar";
import Button from "../Button";
import { SafeReservation } from "@/app/types";

interface ListingReservationProps {
  listingId: string;
  price: number;
  reservations: SafeReservation[];
}

const initialRange = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
];

const ListingReservation: React.FC<ListingReservationProps> = ({
  listingId,
  price,
  reservations,
}) => {
  const [range, setRange] = useState(initialRange);
  const [totalPrice, setTotalPrice] = useState(price);
  const [isLoading, setIsLaoding] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const startDate = range[0].startDate;
    const endDate = range[0].endDate;

    const dayCount = differenceInCalendarDays(endDate, startDate);
    if (dayCount === 0) {
      setTotalPrice(price);
    } else {
      setTotalPrice(dayCount * price);
    }
  }, [range]);

  const onChange = useCallback(
    (item: any) => {
      setRange([item.selection]);
    },
    [setRange]
  );

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((item) => {
      const result = eachDayOfInterval({
        start: new Date(item.startDate),
        end: new Date(item.endDate),
      });
      dates.push(...result);
    });
    return dates;
  }, [reservations]);

  const onReserve = useCallback(() => {
    setIsLaoding(true);
    const data = {
      startDate: range[0].startDate,
      endDate: range[0].endDate,
      price,
      listingId,
    };
    axios
      .post("/api/reservation", data)
      .then(() => {
        // back to it
        router.push('/trips');
        router.refresh()
      })
      .catch((erro: any) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLaoding(false);
      });
  }, [range, setIsLaoding]);

  return (
    <div
      className="
        col-span-3
        border-[1px]
        rounded-lg
        order-1 md:order-2
      "
    >
      <div
        className="
        p-4 
        flex 
        flex-row 
        gap-2 
        items-center
      "
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-gray-500">night</div>
      </div>
      <hr />
      <Calendar
        range={range}
        onChange={onChange}
        disabledDates={disabledDates}
        
      />
      <hr />
      <div className="p-4">
        <Button 
          actionLabel="Reserve" 
          action={onReserve}
          disabled={isLoading}
          />
      </div>
      <div
        className="
          p-4
          flex
          flex-row
          justify-between
          items-center
          text-lg
          font-semibold
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
