"use server";
import { Answer } from "@/database/answer.model";
import connectDb from "../mongoose";
import {
  CreateAnswerParams,
  GetAnswersParams,
} from "../sharedtypes/sharedtypes";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";
import { User } from "@/database/user.model";

export const postAnswer = async (params: CreateAnswerParams) => {
  try {
    connectDb();
    const { content, author, question, path } = params;
    const answer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getAnswersByQuestion = async (params: GetAnswersParams) => {
  try {
    connectDb();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({
        path: "author",
        model: User,
        select: "name picture",
      });
    return answers;
  } catch (error: any) {
    console.log(error.message);
  }
};
