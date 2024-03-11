"use client";

import { useCallback, useState } from "react";

import Item from "./Item";
import UserItem from "./UserItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/userLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggele = useCallback(() => {
    setIsVisible((value) => !value);
  }, []);

  const openRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal]);

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
      <Item onClick={() => {router.push("/trips")}} label="My trips" />
      <Item onClick={() => {}} label="My favorites" />
      <Item onClick={() => {}} label="My reservations" />
      <Item onClick={() => {}} label="My properties" />
      <Item onClick={openRent} label="Airbnb my home" />
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
        onClick={openRent}
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
