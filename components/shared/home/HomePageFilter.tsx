"use client";
import { Badge } from "@/components/ui/badge";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const HomePageFilter = () => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleFilter(item: string) {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: null,
        key: "filter",
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: item.toLowerCase(),
        key: "filter",
      });
      router.push(newUrl, { scroll: false });
    }
  }
  return (
    <div className="custom-scrollbar mt-7  flex gap-2 overflow-x-auto">
      {filter.map((item) => (
        <Badge
          key={item.id}
          variant="outline"
          className={`cursor-pointer  rounded-md bg-gray-100 p-1 text-xs text-gray-600 drop-shadow-sm hover:bg-orange-500 hover:text-white dark:bg-white dark:text-black dark:hover:bg-orange-400 dark:hover:text-white md:px-4 md:py-2 ${
            active === item.title ? "bg-orange-400 text-white" : ""
          }`}
          onClick={() => handleFilter(item.title)}
        >
          {item.title}
        </Badge>
      ))}
    </div>
  );
};

interface Props {
  title: string;
  id: number;
}

const filter: Props[] = [
  {
    title: "Newest",
    id: 2,
  },
  {
    title: "Frequent",
    id: 3,
  },
  {
    title: "Unanswered",
    id: 4,
  },
  {
    title: "Recommended",
    id: 5,
  },
];

export default HomePageFilter;
