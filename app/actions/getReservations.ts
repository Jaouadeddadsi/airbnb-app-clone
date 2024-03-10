import prisma from "../libs/db";

interface IPrams {
  listingId?: string;
}

export default async function getReservations(params: IPrams) {
  try {
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return [];
    }
    const reservations = await prisma.reservation.findMany({
      where: {
        listingId,
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toDateString(),
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
