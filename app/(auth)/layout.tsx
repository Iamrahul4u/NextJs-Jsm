import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "../globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven Platform for asking and answering questions",
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <h1>Home</h1>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
