import prisma from "../libs/db";

export interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, category } = params;

    let query = {};
    if (userId) {
      query = {
        ...query,
        userId,
      };
    }
    if (category) {
      query = {
        ...query,
        category,
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
  } catch (error: any) {
    throw new Error(error);
  }
}
