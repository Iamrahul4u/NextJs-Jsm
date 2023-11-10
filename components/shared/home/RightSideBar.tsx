import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BadgeDemo } from "../Badge";
import { getTags } from "@/lib/actions/tags.action";
import { ITag } from "@/database/tag.model";

const topQuestions: { id: number; question: string }[] = [
  {
    id: 1,
    question:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    id: 2,
    question: "Can I get the course for free?",
  },
  {
    id: 3,
    question: "Redux Toolkit Not Updating State as Expected",
  },
  {
    id: 4,
    question: "Async/Await Function Not Handling Errors Properly",
  },
  {
    id: 5,
    question: "How do I use express as a custom server in NextJS?",
  },
];

export const badgeData: ITag[] = await getTags();

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar light-border shadow-light-300  sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6  pb-10 pt-24 dark:bg-zinc-900 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900 text-2xl font-bold">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              key={question.id}
              className="flex cursor-pointer items-center justify-between gap-7"
              href="/question/64fa010665fc5fb2850ef9af"
            >
              <p className="body-medium text-dark500_light700 line-clamp-2 text-sm">
                {question.question}
              </p>
              <Image
                alt="Chevron right icon"
                loading="lazy"
                width={20}
                height={20}
                className="invert-colors"
                src="/assets/icons/chevron-right.svg"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {badgeData.map((badge) => (
            <Link
              key={badge._id}
              className="flex justify-between gap-2 "
              href={`/tags/${badge._id}`}
            >
              <BadgeDemo title={badge.name} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
