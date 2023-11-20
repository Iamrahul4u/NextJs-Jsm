"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  pageNum: number;
  isNext: boolean;
}
const Pagination = ({ pageNum, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  function handlePage(instruction: string) {
    const nextPage = instruction === "prev" ? pageNum - 1 : pageNum + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPage.toString(),
    });
    router.push(newUrl, { scroll: false });
  }

  return (
    <nav>
      <ul className="flex items-center justify-center">
        <Button
          disabled={pageNum === 1}
          className=" mx-1   flex items-center justify-center rounded-md border  bg-slate-100 px-3.5 py-2 text-sm text-black transition duration-150 ease-in-out hover:bg-slate-200 disabled:cursor-not-allowed dark:bg-white dark:text-black"
          aria-label="Previous"
          onClick={() => handlePage("prev")}
        >
          <span className="material-icons text-sm">Prev</span>
        </Button>
        <li>
          <button className="mx-1 flex h-8 w-8 items-center justify-center rounded-md  bg-orange-500  text-sm text-white shadow-md transition duration-150 ease-in-out">
            {pageNum}
          </button>
        </li>

        <Button
          disabled={!isNext}
          className="mx-1 flex  items-center justify-center rounded-md border bg-slate-100  px-3.5 py-2  text-sm text-black transition duration-150 ease-in-out hover:bg-slate-200 disabled:cursor-not-allowed "
          aria-label="Next"
          onClick={() => handlePage("next")}
        >
          Next
        </Button>
      </ul>
    </nav>
  );
};

export default Pagination;
