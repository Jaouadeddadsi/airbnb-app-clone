import prisma from "../libs/db";

interface IPrams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IPrams) {
  try {
    const { listingId, userId, authorId } = params;
    let query = {};
    if (listingId) {
      query = {
        ...query,
        listingId,
      };
    }
    if (userId) {
      query = {
        ...query,
        userId,
      };
    }
    if (authorId) {
      query = {
        ...query,
        listing: {
          userId: authorId,
        },
      };
    }
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
