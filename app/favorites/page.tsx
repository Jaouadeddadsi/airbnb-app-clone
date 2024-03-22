import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import Container from "../componenets/Container";
import EmptyState from "../componenets/EmptyState";
import Heading from "../componenets/Heading";
import ListingCard from "../componenets/ListingCard";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorite listings found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }

  return (
    <div className="mt-28">
      <Container>
        <Heading
          title="Favorites"
          subtitle="List of places you have favorited!"
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
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FavoritesPage;
