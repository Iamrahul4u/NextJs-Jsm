"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
interface filter {
  id: string;
  label: string;
}
const Filter = ({ filter }: { filter: filter[] }) => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const router = useRouter();
  function handleFilter(value: string) {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  }
  return (
    <Select
      onValueChange={handleFilter}
      defaultValue={filterParam || undefined}
    >
      <SelectTrigger className="h-[40px] w-[190px] focus:ring-1 focus:ring-gray-600 focus:ring-offset-0 ">
        <SelectValue placeholder="Select Filter" />
      </SelectTrigger>
      <SelectContent>
        {filter?.map((user) => (
          <SelectItem key={user.id} value={user.label}>
            {user.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
