import getCurrentUser from "./actions/getCurrentUser";
import getListings, {IListingsParams} from "./actions/getListings";
import Container from "./componenets/Container";
import EmptyState from "./componenets/EmptyState";
import ListingCard from "./componenets/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

export default async function Home({searchParams}: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState
      title="No exact matches"
      subtitle="Try changing or removing some of your filters"
    />
  }

  return (
    <div className="mt-52">
      <Container>
        <div
          className="
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
}
