"use client";

import Container from "@/app/componenets/Container";
import ListingHead from "@/app/componenets/listing/ListingHead";
import { SafeListing, SafeUser } from "@/app/types";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser }) => {
  return (
    <Container>
      <div
        className="
        mt-28
        max-w-5xl
        mx-auto
      "
      >
        <ListingHead listing={listing} currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default ListingClient;
