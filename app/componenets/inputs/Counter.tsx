"use client";

import { useCallback, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (guests: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const [guests, setGuests] = useState(value);

  const onMinus = useCallback(() => {
    if (guests === 1) {
      return;
    }
    onChange(guests - 1);
    setGuests((n) => n - 1);
  }, [guests, setGuests, onChange]);

  const onPlus = useCallback(() => {
    onChange(guests + 1);
    setGuests((n) => n + 1);
  }, [guests, setGuests, onChange]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <div className="font-medium">{title}</div>
        <div className="font-normal text-neutral-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button onClick={onMinus}>
          <CiCircleMinus size={45} className="text-neutral-400" />
        </button>
        <div className="text-xl">{guests}</div>
        <button onClick={onPlus}>
          <CiCirclePlus size={45} className="text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
