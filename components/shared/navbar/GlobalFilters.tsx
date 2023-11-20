"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = ({ name }: { name: string }) => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleFilter(item: string) {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: null,
        key: "type",
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: item.toLowerCase(),
        key: "type",
      });
      router.push(newUrl, { scroll: false });
    }
  }
  return (
    <div className="flex">
      <button
        onClick={() => handleFilter(name)}
        type="button"
        className={` small-medium hover:text-primary-500 dark:hover:text-primary-500 rounded-2xl  bg-slate-200 px-3.5 py-1.5 text-sm capitalize dark:bg-dark-500  dark:text-light-800 ${
          searchParams.get("type") === name.toLowerCase()
            ? "!bg-orange-500 !text-white"
            : ""
        }`}
      >
        {name}
      </button>
    </div>
  );
};

export default GlobalFilters;
