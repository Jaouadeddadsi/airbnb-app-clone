import { NextResponse } from "next/server";
import prisma from "@/app/libs/db";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation id");
  }

  const reservation = await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  return NextResponse.json(reservation);
}
