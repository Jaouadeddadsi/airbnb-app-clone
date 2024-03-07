import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/componenets/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState
    title="No listing"
    subtitle="Select new one"
  />
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
    />
  )
}
