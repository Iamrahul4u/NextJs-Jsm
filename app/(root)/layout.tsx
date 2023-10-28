import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "../globals.css";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven Platform for asking and answering questions",
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${grotesk.variable}`}>
          <h1 className="h1-bold">HomeNav</h1>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
