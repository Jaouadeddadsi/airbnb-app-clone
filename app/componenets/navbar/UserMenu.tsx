"use client";

import { useCallback, useState } from "react";

import Item from "./Item";
import UserItem from "./UserItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/userLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isVisible, setIsVisible] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggele = useCallback(() => {
    setIsVisible((value) => !value);
  }, []);

  const dropDownMenu = currentUser ? (
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
      <Item onClick={() => {}} label="My trips" />
      <Item onClick={() => {}} label="My favorites" />
      <Item onClick={() => {}} label="My reservations" />
      <Item onClick={() => {}} label="My properties" />
      <Item onClick={() => {}} label="Airbnb my home" />
      <hr />
      <Item
        onClick={() => {
          signOut();
        }}
        label="Logout"
      />
    </div>
  ) : (
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
      <Item onClick={loginModal.onOpen} label="Login" />
      <Item onClick={registerModal.onOpen} label="Sign up" />
    </div>
  );

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
      {isVisible && dropDownMenu}
    </div>
  );
};

export default UserMenu;
