import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }

  let favoriteIds = currentUser.favoriteIds || [];

  if (favoriteIds.includes(listingId)) {
    favoriteIds = favoriteIds.filter((item) => item !== listingId);
  } else {
    favoriteIds.push(listingId);
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
