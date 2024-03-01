"use client";

interface ItemProps {
  label: string;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
      w-full
      hover:bg-neutral-200
      text-left
      py-2
      px-4
      cursor-pointer
      text-sm
      font-semibold
    "
    >
      {label}
    </button>
  );
};

export default Item;
