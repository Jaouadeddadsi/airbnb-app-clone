"use client";

import { useCallback, useState } from "react";

import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  listingId: string;
  price: number;
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
}) => {
  const [range, setRange] = useState(initialRange);

  const [totalPrice, setTotalPrice] = useState(price);

  const onChange = useCallback(
    (item: any) => {
      setRange([item.selection]);
    },
    [setRange]
  );

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
      <Calendar range={range} onChange={onChange} />
      <hr />
      <div className="p-4">
        <Button actionLabel="Reserve" action={() => {}} />
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
