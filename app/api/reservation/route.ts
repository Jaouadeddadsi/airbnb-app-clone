import { differenceInCalendarDays } from "date-fns";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { startDate, endDate, price, listingId } = body;

    if (!startDate || !endDate || !price || !listingId) {
      return NextResponse.error();
    }

    const dayCount = differenceInCalendarDays(endDate, startDate);
    const totalPrice = price * dayCount;

    const reservation = await prisma.reservation.create({
      data: {
        startDate,
        endDate,
        userId: currentUser.id,
        listingId,
        totalPrice,
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
}
