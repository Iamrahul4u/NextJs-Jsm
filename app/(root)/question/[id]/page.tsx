import AnalyticsDetails from "@/components/shared/AnalyticsDetails";
import Answer from "@/components/shared/QuestionPage/Answer";
import AnswerForm from "@/components/shared/QuestionPage/AnswerForm";
import ParseHtml from "@/components/shared/ParseHtml";
import { Badge } from "@/components/ui/badge";
import { getQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import React from "react";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { getAnswersByQuestion } from "@/lib/actions/answer.action";
import Filter from "@/components/shared/Filter";

const Page = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  const mongouser = await getUser({ userId });
  const question = await getQuestionById({ id: params.id });
  const answers = await getAnswersByQuestion({ questionId: params.id });
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
          <div>Voting</div>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold">{question.title}</h2>
        </div>
        {/* Views,times ago,answers */}
        <AnalyticsDetails
          views={question.views.length || 0}
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
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer rounded-md  bg-zinc-100 p-1  text-xs text-gray-700 drop-shadow-md hover:bg-orange-500 hover:text-white dark:bg-white dark:text-black dark:hover:bg-orange-400 dark:hover:text-white md:px-4 md:py-2"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        {/* Answers Section */}
        <div className="mt-14">
          {/* Answers Filter */}
          <div className="flex items-center justify-between">
            <p className="text-orange-500">
              {question.answers.length || 0} Answers
            </p>
            <Filter filter={AnswersFilter} />
          </div>
        </div>
        {answers?.map((answer) => <Answer key={answer._id} answer={answer} />)}
        <AnswerForm
          author={JSON.stringify(mongouser._id)}
          question={JSON.stringify(question._id)}
        />
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
