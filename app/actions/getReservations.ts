import prisma from "../libs/db";

interface IPrams {
  listingId?: string;
  userId?: string;
}

export default async function getReservations(params: IPrams) {
  try {
    const { listingId, userId } = params;
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
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
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
