"use client";

import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SafeUser } from "../types";
import useLoginModal from "../hooks/userLoginModal";

interface HeartButtonProps {
  favorite: boolean;
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  favorite,
  listingId,
  currentUser,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const loginModal = useLoginModal();

  const toggeleFavorite = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsFavorite((value) => !value);
    axios.get(`/api/listing/${listingId}`);
  }, [setIsFavorite, listingId, currentUser]);

  return (
    <div onClick={toggeleFavorite}>
      <FaRegHeart
        size={24}
        className="
      absolute
      top-3
      right-3
      fill-white
      "
      />
      <FaHeart
        size={20}
        className={`
      absolute
      top-[14px]
      right-[14px]
      ${isFavorite ? "fill-rose-500" : "fill-gray-500"}
      `}
      />
    </div>
  );
};

export default HeartButton;
