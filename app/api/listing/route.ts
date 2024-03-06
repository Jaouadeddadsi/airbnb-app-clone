import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    price,
  } = body;

  if (
    !title ||
    !description ||
    !imageSrc ||
    !category ||
    !roomCount ||
    !guestCount ||
    !bathroomCount ||
    !locationValue ||
    !price
  ) {
    throw new Error("Invalid listing details");
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount: + roomCount,
      guestCount: + guestCount,
      bathroomCount: +bathroomCount,
      locationValue,
      price: +price,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
