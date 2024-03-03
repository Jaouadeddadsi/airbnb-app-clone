"use client";

import { useCallback, useState } from "react";

import Item from "./Item";
import UserItem from "./UserItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  const registerModal = useRegisterModal();

  const toggele = useCallback(() => {
    setIsVisible((value) => !value);
  }, []);

  return (
    <div
      onClick={toggele}
      className="
        flex
        flex-row
        items-center
        gap-4
        relative
      "
    >
      <div
        className="
          hidden
          md:block
          p-4
          cursor-pointer
          text-sm
          font-semibold
          hover:bg-neutral-100
          rounded-full
        "
      >
        Airbnb your home
      </div>
      <UserItem />
      {isVisible && (
        <div
          className="
        absolute
        top-full
        right-0
        w-[170px]
        bg-white
        rounded-xl
        shadow-lg
        flex
        flex-col
        overflow-hidden
        "
        >
          <Item onClick={() => {}} label="Login" />
          <Item onClick={registerModal.onOpen} label="Sign up" />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
