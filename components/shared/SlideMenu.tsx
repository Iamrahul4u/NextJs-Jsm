"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SlideMenu() {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <Link href="/" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <Image
                  src="assets/images/site-logo.svg"
                  height={26}
                  width={26}
                  alt="Site Logo"
                />
                <p className="font-spaceGrotesk text-base md:text-2xl ">
                  Dev
                  <span className="font-inter">Flow</span>
                </p>
              </div>
            </Link>
          </SheetHeader>
          <div className="mt-5 grid gap-4 py-4 ">
            {sidebarLinks.map((item) => {
              const isactive =
                pathname === item.route && pathname.includes(item.route)
                  ? "active"
                  : "";
              return (
                <Link
                  href={item.route}
                  key={item.route}
                  className={`flex items-center gap-2 ${
                    isactive
                      ? "primary-gradient -ml-2 items-center rounded-lg bg-orange-400 p-2  text-white"
                      : "text-dark300_light900"
                  }`}
                >
                  <Image
                    src={item.imgURL}
                    height={20}
                    width={20}
                    alt={item.label}
                    className={`${isactive ? "" : "invert dark:invert-0"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <SheetFooter className="min-w-full">
            <SignedOut>
              <div className="flex grow flex-col gap-2">
                <SheetClose>
                  <Link href="/sign-in">
                    <Button className="w-full " variant="default">
                      Login
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link href="/sign-up">
                    <Button className="w-full bg-slate-700  " variant="default">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
