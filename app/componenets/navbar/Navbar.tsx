"use client";

import Container from "../Container";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div
      className="
        w-full
        fixed
        top-0
        inset-y-0
        z-10
        shadow-sm*
        bg-white
      "
    >
      <div
        className="
          py-4
          border-b-[1px]
          border-b-neutral-200
        "
      >
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            "
          >
            <Logo />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
