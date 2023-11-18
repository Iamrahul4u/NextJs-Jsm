import React from "react";
import "../globals.css";
// eslint-disable-next-line camelcase
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven Platform for asking and answering questions",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="my-auto flex h-screen w-full items-center justify-center">
        {children}
      </body>
    </html>
  );
}
