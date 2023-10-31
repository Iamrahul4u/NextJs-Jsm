import React from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { SlideMenu } from "./SlideMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="fixed  z-50 flex min-w-full items-center px-10 py-4 dark:bg-zinc-900 md:justify-between  ">
      <Link href="/" className="cursor-pointer">
        <div className="flex items-center  md:space-x-2 ">
          <Image
            src="assets/images/site-logo.svg"
            height={28}
            width={28}
            alt="Site Logo"
          />
          <p className="font-spaceGrotesk text-base md:text-2xl ">
            Dev
            <span className="font-inter">Flow</span>
          </p>
        </div>
      </Link>
      <div className=" flex w-1/2 justify-center">
        <SearchBar title={"Search Globally"} />
      </div>
      <div className="focus-visible:none flex items-center space-x-4">
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SlideMenu />
      </div>
    </div>
  );
};

export default Navbar;
