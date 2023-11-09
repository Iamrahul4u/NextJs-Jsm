import { timeAgo } from "@/utlils/helperFunction";
import Image from "next/image";
import React from "react";

interface Props {
  views?: number;
  votes?: number;
  answers?: number;
  createdAt?: string;
}
const AnalyticsDetails = (question: Props) => {
  return (
    <div className="my-2 flex items-center gap-3">
      {question.votes! >= 0 ? (
        <span className=" flex gap-1 text-sm text-gray-600">
          <Image
            src="/assets/icons/like.svg"
            height={18}
            width={18}
            alt="likes"
          />
          <p className="flex text-xs md:text-sm">{question.votes} Votes</p>
        </span>
      ) : (
        ""
      )}

      {question.answers! >= 0 ? (
        <span className=" flex gap-1 text-sm text-gray-600">
          <Image
            src="/assets/icons/message.svg"
            height={18}
            width={18}
            alt="likes"
          />
          <p className="flex text-xs md:text-sm">{question.answers} Answers</p>
        </span>
      ) : (
        ""
      )}
      {question.views! >= 0 ? (
        <span className="flex gap-1 text-sm text-gray-600">
          <Image
            src="/assets/icons/eye.svg"
            height={18}
            width={18}
            alt="likes"
          />
          <p className="flex text-xs md:text-sm">{question.views} Views</p>
        </span>
      ) : (
        ""
      )}
      {question.createdAt ? (
        <span className="flex gap-1 text-sm text-gray-600">
          <Image
            src="/assets/icons/clock.svg"
            height={18}
            width={18}
            alt="likes"
          />
          <p className="text-sm text-gray-500">{timeAgo(question.createdAt)}</p>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default AnalyticsDetails;
