"use server";

import { Question } from "@/database/question.model";
import connectDb from "../mongoose";
import { Tag } from "@/database/tag.model";
import { User } from "@/database/user.model";
import {
  CreateQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
} from "../sharedtypes/sharedtypes";
import { revalidatePath } from "next/cache";
import { Answer } from "@/database/answer.model";
import { Interaction } from "@/database/interaction.model";

export const getQuestions = async () => {
  connectDb();
  try {
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return questions;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const postQuestion = async (params: CreateQuestionParams) => {
  connectDb();
  try {
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
      createdAt: new Date(),
    });
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: tagDocuments },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  connectDb();
  try {
    const { id } = params;
    const question = await Question.findById(id)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({ path: "author", model: User, select: "_id name picture" });
    return question;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  connectDb();
  try {
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("QUestion Not Found");
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const downVoteQuestion = async (params: QuestionVoteParams) => {
  connectDb();
  try {
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("QUestion Not Found");
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const getQuestionByUserId = async (params: any) => {
  connectDb();
  try {
    const { userId } = params;
    console.log(userId);
    const user = await Question.find({ author: userId }).populate({
      path: "author",
      model: User,
    });
    console.log(user);

    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const deleteQuestionById = async (params: {
  questionId: string;
  path: string;
}) => {
  connectDb();
  try {
    const { questionId, path } = params;
    await Question.findByIdAndDelete({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
    );
    await Interaction.deleteMany({ question: questionId });
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const updateQuestionById = async (params: EditQuestionParams) => {
  connectDb();
  try {
    const { questionId, title, content, path } = params;
    await Question.findByIdAndUpdate(
      { _id: questionId },
      { title, content },
      { new: true },
    );

    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
