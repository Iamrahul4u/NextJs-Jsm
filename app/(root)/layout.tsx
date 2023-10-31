import React from "react";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" relative flex min-h-screen min-w-full flex-col ">
      <Navbar />
      <div className=" flex">
        <LeftSideBar />
        <section className=" flex min-h-screen flex-1 ">
          <div className=" w-full md:max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}
