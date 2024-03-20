"use client";

import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SafeUser } from "../types";
import useLoginModal from "../hooks/userLoginModal";
import { useRouter } from "next/navigation";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggeleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

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
      ${hasFavorited ? "fill-rose-500" : "fill-gray-500"}
      `}
      />
    </div>
  );
};

export default HeartButton;
