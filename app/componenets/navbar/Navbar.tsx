"use client";

import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();

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
            <div
              onClick={() => {
                router.push("/");
              }}
              className="hidden md:block"
            >
              <Logo />
            </div>
            <Suspense>
            <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* categories */}
      {pathname === "/" && (
        <div
          className="
          border-b-[1px]
          border-neutral-100
          overflow-x-auto
          overflow-y-hidden
        "
        >
          <Container>
            <Suspense>
              <Categories />
            </Suspense>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Navbar;
