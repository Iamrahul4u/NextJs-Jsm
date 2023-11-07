import TagsCard from "@/components/shared/Card/TagCard";
import Filter from "@/components/shared/Filter";
import SearchBar from "@/components/shared/SearchBar";
import { getTags } from "@/lib/actions/tags.action";
import React from "react";

const Page = async () => {
  const result = await getTags();
  return (
    <section className=" flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 mb-5 text-3xl font-bold">Tags</h1>
      </div>
      <div className="mt-2 flex gap-4">
        <SearchBar title={"Search Tags"} />
        <Filter filter={Tags} />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-10">
        {result ? (
          result?.map((tag) => <TagsCard key={tag._id} tag={tag} />)
        ) : (
          <div>No Tags Found</div>
        )}
      </div>
    </section>
  );
};

export default Page;
export const Tags = [
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
