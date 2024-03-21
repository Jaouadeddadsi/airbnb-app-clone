import Container from "../componenets/Container";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../componenets/EmptyState";
import Heading from "../componenets/Heading";
import ListingCard from "../componenets/ListingCard";

const ProppertiesPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({userId: currentUser.id})

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    )
  }
  
  return (
    <div className="mt-28">
      <Container>
        <Heading
          title="Properties"
          subtitle="List of your properties"
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
              deleteProperty={true}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
 
export default ProppertiesPage;