import prisma from "../libs/db";

interface IParams {
  listingsIds?: string[] | undefined;
  favoriteIds?: string[] | undefined;
  userId?: string | undefined;
}

export default async function getListings(params: IParams) {
  const { listingsIds, favoriteIds, userId } = params;

  let query = {};
  if (listingsIds) {
    query = {
      ...query,
      id: { in: listingsIds },
    };
  }
  if (favoriteIds) {
    query = {
      ...query,
      id: { in: favoriteIds },
    };
  }
  if (userId) {
    query = {
      ...query,
      userId,
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
