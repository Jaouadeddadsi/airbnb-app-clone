"use client";

import Image from "next/image";

const Logo = () => {
  return (
    <Image
      alt="logo"
      src="/images/logo.png"
      width={100}
      height={50}
      className="
        cursor-pointer
        hover:opacity-80
        transition
      "
    />
  );
}
 
export default Logo;