import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./componenets/navbar/Navbar";
import RegisterModal from "./componenets/modal/RegisterModal";
import ToastProvider from "./provides/ToastProvider";
import LoginModal from "./componenets/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb clone",
  description: "Next.js implementation inspired  by the Airbnb website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
