import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "emailVerified" | "createdAt" | "updatedAt"
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "startDate" | "endDate" | "createdAt"
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
};
