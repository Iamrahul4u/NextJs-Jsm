import { timeAgo } from "@/utlils/helperFunction";
import Image from "next/image";
import React from "react";

import AnalyticsDetails from "../AnalyticsDetails";
import { BadgeDemo } from "../Badge";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../Profile/EditDeleteAction";
import Link from "next/link";
import Toast from "../Toast";

interface Props {
  question: any;
  userId?: string;
  clerkId?: string;
}
const Card = ({ question, userId, clerkId }: Props) => {
  const showActionButtons = userId && clerkId && userId === clerkId;
  return (
    <div className="mb-4 max-w-4xl  cursor-pointer rounded-lg p-4 shadow-md dark:bg-zinc-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start  md:items-center">
          <div className="mr-4 hidden md:block ">
            <Image
              src={question.author.picture}
              alt={question.title}
              height={42}
              width={42}
              className=" rounded-full object-cover "
            />
          </div>
          <div>
            <Link key={question._id} href={`/question/${question._id}`}>
              <h2
                className="line-clamp-1 text-xl max-sm:text-[#66bcec]
md:font-semibold"
              >
                {question.title}
              </h2>
            </Link>
            <p className="text-gray-600">{question.author.name}</p>
            <p className="text-sm text-gray-500">
              {timeAgo(question.createdAt)}
            </p>
          </div>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="Question"
              itemId={JSON.parse(JSON.stringify(question._id))}
            />
          )}
        </SignedIn>
      </div>

      <div className="mt-4 flex-col justify-between md:flex md:flex-row">
        {/* </div>  */}
        <AnalyticsDetails
          views={question.views || 0}
          answers={question.answers.length || 0}
          votes={question.upvotes.length || 0}
        />
        <div className="mt-2 space-x-2">
          {question?.tags?.map((tag: any) => (
            <BadgeDemo key={tag._id} title={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
