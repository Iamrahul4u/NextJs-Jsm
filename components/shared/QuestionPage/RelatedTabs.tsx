import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IQuestion } from "@/database/question.model";
import Link from "next/link";
import React from "react";
import Card from "../Card/CardComponent";
import Image from "next/image";
import { timeAgo } from "@/utlils/helperFunction";
import { SignedIn, auth } from "@clerk/nextjs";
import EditDeleteAction from "../Profile/EditDeleteAction";

interface Props {
  questions: any;
  answers: any;
  userId?: string;
}
const RelatedTabs = ({ questions, answers, userId }: Props) => {
  const { userId: clerkId } = auth();
  const showActionButtons = userId && clerkId && userId === clerkId;

  return (
    <Tabs defaultValue="account" className="max-w-4xl">
      <TabsList>
        <TabsTrigger value="Question">Questions</TabsTrigger>
        <TabsTrigger value="Answer">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="Question">
        {questions
          ? questions?.map((question: IQuestion) => (
              <Card
                question={question}
                key={question._id}
                userId={userId!}
                clerkId={clerkId!}
              />
            ))
          : "No Questions"}
      </TabsContent>

      {/* Answers Tab */}
      <TabsContent value="Answer">
        {answers?.map((answer: any) => (
          <div
            key={answer._id}
            className="mb-6 mt-4 flex cursor-pointer flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <Link href={`/question/${answer?.question?._id}`}>
                <h2 className="text-base font-medium">
                  {answer.question!.title!}
                </h2>
              </Link>

              <SignedIn>
                {showActionButtons && (
                  <EditDeleteAction
                    type="Answer"
                    itemId={JSON.parse(JSON.stringify(answer._id))}
                  />
                )}
              </SignedIn>
            </div>
            <div className="flex justify-between ">
              <div className="flex items-center gap-1">
                <Image
                  src={answer.author.picture}
                  height={20}
                  width={20}
                  alt="answersAuthorImage"
                  className="rounded-full object-contain"
                />
                <p className="text-sm  ">{answer?.author?.name}</p>
                <p className="text-xs text-gray-600">
                  • answered {timeAgo(answer.question!.createdAt)}
                </p>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/assets/icons/like.svg"
                  height={16}
                  width={16}
                  className="rounded-full"
                  alt="likes"
                />
                <p>{answer.upvotes?.length}</p>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default RelatedTabs;
