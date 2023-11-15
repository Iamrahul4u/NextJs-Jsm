import Questions from "@/components/shared/QuestionPage/Questions";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUser } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUser({ userId });
  const questionDetails = await getQuestionById({ id: params.id });
  return (
    <>
      <h1>Edit Question</h1>
      <div>
        <Questions
          type="Edit"
          mongoUser={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(questionDetails)}
        />
      </div>
    </>
  );
};

export default page;
