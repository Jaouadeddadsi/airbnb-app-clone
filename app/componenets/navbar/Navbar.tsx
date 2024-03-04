"use client";

import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div
      className="
        w-full
        fixed
        top-0
        inset-x-0
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
            gap-2
            "
          >
            <div className="hidden md:block">
              <Logo />
            </div>
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
