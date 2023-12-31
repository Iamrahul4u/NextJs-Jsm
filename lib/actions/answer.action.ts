"use server";
import { Answer } from "@/database/answer.model";
import connectDb from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "../sharedtypes/sharedtypes";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";
import { User } from "@/database/user.model";
import { Interaction } from "@/database/interaction.model";

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
    const { questionId, filter } = params;

    let sortOptions = {};
    switch (filter) {
      case "Highest Upvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "Lowest Upvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "Most Recents":
        sortOptions = { createdAt: -1 };
        break;
      case "Oldest":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const answers = await Answer.find({ question: questionId })
      .sort(sortOptions)
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

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  connectDb();
  try {
    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("QUestion Not Found");
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const downVoteAnswer = async (params: AnswerVoteParams) => {
  connectDb();
  try {
    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("QUestion Not Found");
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const deleteAnswersById = async (params: {
  answerId: string;
  path: string;
}) => {
  connectDb();
  try {
    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);
    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } },
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
