"use client";

import { useMemo } from "react";

import Container from "@/app/componenets/Container";
import ListingHead from "@/app/componenets/listing/ListingHead";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/componenets/navbar/Categories";
import ListingInfo from "@/app/componenets/listing/ListingInfo";
import ListingReservation from "@/app/componenets/listing/ListingReservation";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

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
        <div
          className="
          mt-4
          grid
          grid-cols-1
          md:grid-cols-7
          gap-8
          mb-16
        "
        >
          {/* left side */}
          <ListingInfo
            user={listing.user}
            guestCount={listing.guestCount}
            roomCount={listing.roomCount}
            bathroomCount={listing.bathroomCount}
            category={category}
            title={listing.title}
            locationValue={listing.locationValue}
          />

          {/* right side */}
          <ListingReservation
            listingId={listing.id}
            price={listing.price}
            reservations={reservations}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
