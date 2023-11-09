import React from "react";
import "../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import LeftSideBar from "@/components/shared/home/LeftSideBar";
import RightSideBar from "@/components/shared/home/RightSideBar";

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
        <section className="flex min-h-screen flex-1 flex-col justify-start px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className=" w-full md:max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}
