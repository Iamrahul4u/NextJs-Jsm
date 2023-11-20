"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RemoveUrlQuery, formUrlQuery } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import GlobalResult from "./GlobalResult";

const GlobalSearchBar = ({ title }: { title: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pathname = usePathname();
  const [search, setSearch] = useState(query || "");
  const searchContinerRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchContinerRef.current &&
        // @ts-ignore
        !searchContinerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    setOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pathname]);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      try {
        if (search) {
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            value: search,
            key: "global",
          });
          router.push(newUrl, { scroll: false });
        } else {
          const newUrl = RemoveUrlQuery({
            params: searchParams.toString(),
            keys: ["global"],
          });

          router.push(newUrl, { scroll: false });
        }
      } catch (error) {
        console.log(error);
      }
    }, 300);
    return () => clearTimeout(delayBounce);
  }, [search, searchParams]);
  return (
    <div
      ref={searchContinerRef}
      className="flex w-full  items-center space-x-2  rounded-md  bg-slate-100 pl-2 align-middle  dark:bg-zinc-800 max-lg:hidden"
    >
      <div className="flex space-x-2">
        <Image
          src="/assets/icons/search.svg"
          height={16}
          width={16}
          alt="Site Logo"
        />
        <div className=" h-10  w-full rounded-xl bg-transparent p-2 ">
          <Input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            placeholder="Search"
            className="h-full w-full rounded-lg bg-transparent pl-2   focus:border-blue-300 focus:outline-none focus:ring-0"
          />
        </div>
        {isOpen && <GlobalResult />}
      </div>
    </div>
  );
};

export default GlobalSearchBar;
