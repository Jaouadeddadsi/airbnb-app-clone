import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import Container from "../componenets/Container";

import EmptyState from "../componenets/EmptyState";
import Heading from "../componenets/Heading";
import ListingCard from "../componenets/ListingCard";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="Looks like youhavent reserved any trips"
      />
    );
  }

  return (
    <div className="mt-28">
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        <div
          className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              currentUser={currentUser}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              totalPrice={reservation.totalPrice}
              reservationId={reservation.id}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TripsPage;
