"use client";
import { downVoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downVoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  type: string;
  userId?: string | "";
  questionId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  upvotes: number;
  downvotes: number;
  hasSaved?: boolean;
}

const Voting = ({
  type,
  userId,
  questionId,
  hasupVoted,
  hasdownVoted,
  upvotes,
  downvotes,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleVote = async (action: string) => {
    if (type === "Question") {
      if (action === "upvote") {
        await upvoteQuestion({
          userId,
          questionId,
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (action === "downvote") {
        await downVoteQuestion({
          userId,
          questionId,
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (action === "saved") {
        await saveQuestion({
          userId,
          questionId,
          path: pathname,
        });
      }
    } else if (type === "Answer") {
      if (action === "upvote") {
        await upvoteAnswer({
          userId,
          answerId: questionId,
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (action === "downvote") {
        await downVoteAnswer({
          userId,
          answerId: questionId,
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
    }
  };

  useEffect(() => {
    async function view() {
      await viewQuestion({
        userId: userId || undefined,
        questionId,
      });
    }
    view();
  }, [userId, questionId, pathname, router]);

  return (
    <div className="flex  gap-2">
      <div className="flex gap-1">
        <Image
          src={
            hasupVoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          height={18}
          width={18}
          alt="Upvote"
          onClick={() => handleVote("upvote")}
          className="cursor-pointer"
        />
        <p className="bg-zinc-300 px-2 py-1 text-xs text-black dark:bg-gray-700 dark:text-white">
          {upvotes}
        </p>
      </div>

      <div className="flex gap-1">
        <Image
          src={
            hasdownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          height={18}
          width={18}
          alt="Upvote"
          onClick={() => handleVote("downvote")}
          className="cursor-pointer"
        />
        <p className="bg-zinc-300 px-2 py-1 text-xs text-black dark:bg-gray-700 dark:text-white">
          {downvotes}
        </p>
      </div>

      {type === "Question" && (
        <div className="flex gap-1">
          <Image
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            height={18}
            width={18}
            alt="Upvote"
            onClick={() => handleVote("saved")}
            className="ml-2 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Voting;
