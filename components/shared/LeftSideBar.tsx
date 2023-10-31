"use client";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <main className="custom-scrollbar shadow-light-300 sticky  top-0 flex  h-screen w-[266px] flex-col gap-6 overflow-y-auto p-6 pb-10 pt-24  shadow-none dark:bg-zinc-900 dark:shadow-none max-md:hidden md:w-max">
      <div className=" grid gap-8  px-2 py-1">
        {sidebarLinks.map((item) => {
          const isactive =
            pathname === item.route && pathname.includes(item.route)
              ? "active"
              : "";
          return (
            <Link
              href={item.route}
              key={item.route}
              className={`flex items-center gap-2 align-middle ${
                isactive
                  ? "primary-gradient -ml-2 items-center rounded-lg bg-orange-400 p-2 font-bold text-white"
                  : "text-dark300_light900"
              }`}
            >
              <Image
                src={item.imgURL}
                height={18}
                width={18}
                alt={item.label}
                className={`${isactive ? "" : "invert dark:invert-0 "}`}
              />
              <p className="text-lg max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex grow flex-col gap-2 max-lg:hidden">
          <Link href="/sign-in">
            <Button className="w-full " variant="default">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="w-full bg-slate-700  " variant="default">
              Sign Up
            </Button>
          </Link>
        </div>
      </SignedOut>
    </main>
  );
};

export default LeftSideBar;
