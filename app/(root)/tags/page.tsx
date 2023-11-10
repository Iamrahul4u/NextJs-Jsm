import TagsCard from "@/components/shared/Card/TagCard";
import Filter from "@/components/shared/Filter";
import SearchBar from "@/components/shared/SearchBar";
import { getTags } from "@/lib/actions/tags.action";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const result = await getTags();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 mb-5 text-3xl font-bold">Tags</h1>
      </div>
      <div className="mt-8 flex gap-4">
        <SearchBar title={"Search Tags"} />
        <Filter filter={Tags} />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-10">
        {result ? (
          result?.map((tag) => (
            <Link key={tag._id} href={`tags/${tag._id}`}>
              <TagsCard tag={tag} />
            </Link>
          ))
        ) : (
          <div>No Tags Found</div>
        )}
      </div>
    </>
  );
};

export default Page;
const Tags = [
  {
    id: "1",
    label: "Popular",
  },
  {
    id: "2",
    label: "Recent",
  },
  {
    id: "3",
    label: "Name",
  },
  {
    id: "4",
    label: "Old",
  },
];
