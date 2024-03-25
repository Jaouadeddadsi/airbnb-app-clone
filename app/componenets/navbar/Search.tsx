"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const searchModal = useSearchModal()
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
        Anywhere
      </div>
      <div
        className="
        px-6
        hidden
        sm:block
        "
      >
        Any Week
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
          Add Guests
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
