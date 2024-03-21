import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }

  try {
    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
}
