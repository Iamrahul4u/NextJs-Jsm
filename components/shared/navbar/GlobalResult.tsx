"use client";
import { globalFilters } from "@/constants/sidebarLinks";
import React, { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";
import ResultListCard from "../Card/ResultListCard";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { globalSearch } from "@/lib/actions/general.action";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
const GlobalResult = () => {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await globalSearch({ query: global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = ({ id, type }: { id: number; type: string }) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "";
    }
  };
  return (
    <div className="custom-scrollbar absolute top-full z-10  h-fit w-[45%] overflow-scroll  rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <div className="flex items-center gap-5  px-5 ">
        <p className="text-dark400_light900 body-medium">Type:</p>
        {globalFilters.map((filter) => (
          <GlobalFilters
            key={filter.label + filter.value}
            name={filter.label}
          />
        ))}
      </div>
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="paragraph-semibold px-5 font-bold">Top Match</p>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <ReloadIcon className="h-10 w-10 animate-spin text-orange-500" />
            <p className="tex-sm mt-2 font-semibold text-gray-700">
              Searching In Entire Database
            </p>
          </div>
        ) : result?.length > 0 ? (
          result.map((item: any, index: number) => (
            <Link
              key={item.id + index}
              href={renderLink({ type: item?.type, id: item?.id })}
              className="flex gap-2"
            >
              <ResultListCard type={item.type} title={item.title} />
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              height={42}
              width={42}
              alt="notFound"
              src="/assets/icons/sad-face-5144.svg"
            />

            <p className="tex-sm mt-2 font-semibold capitalize text-gray-700">
              Not Found in {`"${type || "Database"}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
