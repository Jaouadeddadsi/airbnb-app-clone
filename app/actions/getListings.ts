import prisma from "../libs/db";

export default async function getListings() {
  const listings = await prisma.listing.findMany();

  const safeListings = listings.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return safeListings;
}
