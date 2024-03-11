import prisma from "../libs/db";

interface IParams {
  listingsIds?: string[] | undefined;
}

export default async function getListings(params: IParams) {
  const {listingsIds} = params;

  let query = {};
  if (listingsIds) {
    query = {
      ...query,
      id: { in: listingsIds },
    };
  }
  const listings = await prisma.listing.findMany({
    where: query,
  });

  const safeListings = listings.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return safeListings;
}
