import AnalyticsDetails from "@/components/shared/AnalyticsDetails";
import Answer from "@/components/shared/QuestionPage/Answer";
import AnswerForm from "@/components/shared/QuestionPage/AnswerForm";
import ParseHtml from "@/components/shared/ParseHtml";
import { Badge } from "@/components/ui/badge";
import { getQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import React from "react";
import { getUser } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import { getAnswersByQuestion } from "@/lib/actions/answer.action";
import Filter from "@/components/shared/Filter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Voting from "@/components/shared/QuestionPage/Voting";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId } = auth();
  const mongouser = await getUser({ userId });
  const question = await getQuestionById({ id: params.id });
  const answers = await getAnswersByQuestion({
    questionId: params.id,
    filter: searchParams.filter,
  });
  return (
    <>
      <div className="-mt-18">
        {/* Question asked by author Information */}
        <div className="mb-2 flex flex-col-reverse justify-between gap-2 md:flex-row ">
          <div className="flex  gap-2">
            <Image
              src={question.author.picture}
              height={24}
              width={24}
              alt="authorImage"
              className="rounded-full object-contain"
            />
            <p className="text-base font-semibold">{question.author.name}</p>
          </div>

          {/* Voting  */}
          <SignedIn>
            <Voting
              type="Question"
              userId={mongouser && JSON.parse(JSON.stringify(mongouser?._id))}
              questionId={params.id}
              hasupVoted={question.upvotes.includes(mongouser?._id) || false}
              upvotes={question.upvotes.length}
              hasdownVoted={
                question.downvotes.includes(mongouser?._id) || false
              }
              downvotes={question.downvotes.length}
              hasSaved={mongouser?.saved.includes(params.id)}
            />
          </SignedIn>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold">{question.title}</h2>
        </div>
        {/* Views,times ago,answers */}
        <AnalyticsDetails
          views={question.views || 0}
          answers={question.answers.length || 0}
          createdAt={question.createdAt}
        />
        {/* Parsed Code */}
        <div>
          <ParseHtml data={question.content} />
        </div>
        {/* Tags */}
        <div className="mt-2 space-x-2">
          {question?.tags?.map((tag: any) => (
            <Link key={tag._id} href={`/tags/${tag._id}`}>
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer rounded-md  bg-zinc-100 p-1  text-xs text-gray-700 drop-shadow-md hover:bg-orange-500 hover:text-white dark:bg-white dark:text-black dark:hover:bg-orange-400 dark:hover:text-white md:px-4 md:py-2"
              >
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        {/* Answers Section */}
        {(answers?.length ?? 0) > 0 && (
          <div className="mt-14 max-w-5xl">
            {/* Answers Filter */}
            <div className="flex items-center justify-between">
              <p className="text-orange-500">
                {question.answers.length || 0} Answers
              </p>
              <Filter filter={AnswersFilter} />
            </div>
            {answers?.map((answer) => (
              <Answer
                key={answer._id}
                answer={answer}
                userId={mongouser && JSON.parse(JSON.stringify(mongouser?._id))}
              />
            ))}
          </div>
        )}
        {userId ? (
          <AnswerForm
            author={JSON.stringify(mongouser?._id)}
            question={JSON.stringify(question._id)}
          />
        ) : (
          <div className="flex items-center justify-center gap-4 py-20">
            <h2 className="text-2xl">Login to Answer the Question</h2>
            <Link href="/sign-in">
              <Button className="w-full " variant="default">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;

const AnswersFilter = [
  {
    id: "1",
    label: "Highest Upvotes",
  },
  {
    id: "2",
    label: "Lowest Upvotes",
  },
  {
    id: "3",
    label: "Most Recents",
  },
  {
    id: "4",
    label: "Oldest",
  },
];
