import { BadgeDemo } from "@/components/shared/Badge";
import Card from "@/components/shared/CardComponent";
import { badgeData } from "@/components/shared/RightSideBar";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className=" flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 text-3xl font-bold">
          All Questions
        </h1>
        <a className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient  bg-orange-400 text-white dark:text-white">
            Ask a Question
          </Button>
        </a>
      </div>
      <div className="mt-2">
        <SearchBar title={"Search Topics"} />
      </div>
      <div className="mt-7 flex  gap-2">
        {badgeData.map((badge) => (
          <Link
            key={badge.id}
            className="flex justify-between gap-2 "
            href="/tags/65070473a39264cbbf56a279"
          >
            <BadgeDemo title={badge.text} />
          </Link>
        ))}
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
