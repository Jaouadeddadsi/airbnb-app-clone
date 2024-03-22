import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Container from "../componenets/Container";
import EmptyState from "../componenets/EmptyState";
import Heading from "../componenets/Heading";
import ListingCard from "../componenets/ListingCard";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const reservations =  await getReservations({authorId: currentUser.id});

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservation found"
        subtitle="Looks like you have no reservation"
      />
    )
  }

  return (
    <div className="mt-28">
      <Container>
        <Heading
          title="Reservations"
          subtitle="Bookings on your properties"
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
              actionLabel="Cancel guest reservation"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
 
export default ReservationPage;