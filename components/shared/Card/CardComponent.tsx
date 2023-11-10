import { timeAgo } from "@/utlils/helperFunction";
import Image from "next/image";
import React from "react";

import AnalyticsDetails from "../AnalyticsDetails";
import { BadgeDemo } from "../Badge";

const Card = ({ question }: any) => {
  return (
    <div className="mb-4 max-w-2xl cursor-pointer rounded-lg p-4 shadow-md dark:bg-zinc-800">
      <div className="flex items-start md:items-center">
        <div className="mr-4 hidden md:block">
          <Image
            src={question.author.picture}
            alt={question.title}
            height={42}
            width={42}
            className=" rounded-full object-cover "
          />
        </div>
        <div>
          <h2 className="line-clamp-1 text-xl font-semibold">
            {question.title}
          </h2>
          <p className="text-gray-600">{question.author.name}</p>
          <p className="text-sm text-gray-500">{timeAgo(question.createdAt)}</p>
        </div>
      </div>

      <div className="mt-4 flex-col justify-between md:flex md:flex-row">
        {/* </div>  */}
        <AnalyticsDetails
          views={question.views || 0}
          answers={question.answers.length || 0}
          votes={question.votes || 0}
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
