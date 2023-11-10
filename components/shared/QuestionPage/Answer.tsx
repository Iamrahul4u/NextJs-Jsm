import React from "react";
import Image from "next/image";
import ParseHtml from "../ParseHtml";
import { timeAgo } from "@/utlils/helperFunction";
import Voting from "./Voting";

const Answer = ({ answer, userId }: any) => {
  return (
    <>
      <div className="mb-16 mt-4 max-w-5xl rounded-md px-6 py-4 shadow-md drop-shadow-lg">
        {/* Answers Filter */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={answer.author.picture}
              height={24}
              width={24}
              alt="answersAuthorImage"
              className="rounded-full"
            />
            <p className="text-sm font-semibold ">{answer.author.name}</p>
            <p className="text-xs text-gray-600">
              • answered {timeAgo(answer.createdAt)}
            </p>
          </div>
          {/* <Voting /> */}
          <Voting
            type="Answer"
            userId={userId}
            questionId={JSON.parse(JSON.stringify(answer._id))}
            hasupVoted={answer.upvotes.includes(userId)}
            upvotes={answer.upvotes.length}
            hasdownVoted={answer.downvotes.includes(userId)}
            downvotes={answer.downvotes.length}
          />
        </div>
        <ParseHtml data={answer.content} />
      </div>
    </>
  );
};

export default Answer;
