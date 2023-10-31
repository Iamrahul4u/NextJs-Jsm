import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

const SearchBar = ({ title }) => {
  return (
    <div className="flex w-full  space-x-2   rounded-sm bg-slate-100 pl-2 align-middle  dark:bg-zinc-800 max-lg:hidden">
      <Image
        src="assets/icons/search.svg"
        height={18}
        width={18}
        alt="Site Logo"
      />

      <Input
        type="text"
        className="w-full rounded-full bg-transparent p-2 focus:outline-none focus:ring-0"
        placeholder={title}
      />
    </div>
  );
};

export default SearchBar;
