"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { RemoveUrlQuery, formUrlQuery } from "@/lib/utils";
const SearchBar = ({ title }: { title: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [search, setSearch] = React.useState(query || "");

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          value: search,
          key: "q",
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = RemoveUrlQuery({
          params: searchParams.toString(),
          keys: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayBounce);
  }, [search, searchParams]);
  return (
    <div className="flex w-full  space-x-2   rounded-sm bg-slate-100 pl-2 align-middle  dark:bg-zinc-800 max-lg:hidden">
      <Image
        src="/assets/icons/search.svg"
        height={18}
        width={18}
        alt="Site Logo"
      />

      <Input
        type="text"
        className="w-full rounded-full bg-transparent p-2 focus:outline-none focus:ring-0"
        placeholder={title}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
