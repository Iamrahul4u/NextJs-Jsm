import UserCard from "@/components/shared/Card/UserCard";
import Filter from "@/components/shared/Filter";
import SearchBar from "@/components/shared/SearchBar";
import { getAllUser } from "@/lib/actions/user.action";
import React from "react";

const Page = async () => {
  const result = await getAllUser({});
  return (
    <section className=" flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 mb-5 text-3xl font-bold">
          All Users
        </h1>
      </div>
      <div className="mt-2 flex gap-2">
        <SearchBar title={"Search Topics"} />
        <Filter filter={UsersFilter} />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-10">
        {result ? (
          result?.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div>No User Found</div>
        )}
      </div>
    </section>
  );
};

export default Page;

export const UsersFilter = [
  {
    id: "1",
    label: "Top User",
  },
  {
    id: "2",
    label: "Old User",
  },
  {
    id: "3",
    label: "Top Contributors",
  },
];
