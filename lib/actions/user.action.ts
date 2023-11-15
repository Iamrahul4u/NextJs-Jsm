"use server";

import { User } from "@/database/user.model";
import connectDb from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "../sharedtypes/sharedtypes";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";
import { FilterQuery } from "mongoose";
import { Tag } from "@/database/tag.model";
import { Answer } from "@/database/answer.model";

export const getUser = async (params: any) => {
  connectDb();
  try {
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const createUser = async (params: CreateUserParams) => {
  try {
    connectDb();
    const user = await User.create(params);
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectDb();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User Not Found");
    }
    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findByIdAndDelete({ _id: user._id });
    return deletedUser;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectDb();

    const { path, clerkId, updateData } = params;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const getAllUser = async (params: GetAllUsersParams) => {
  try {
    connectDb();

    // const { path, clerkId, updateData } = params;
    const user = await User.find({});
    return user;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const getUserInfo = async (params: GetUserByIdParams): any => {
  try {
    connectDb();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User Not Found");
    const questions = await Question.find({ author: user._id }).populate([
      { path: "author", model: User },
      { path: "tags", model: Tag },
    ]);
    const answers = await Answer.find({ author: user._id })
      .select("_id upvotes")
      .populate([
        { path: "question", model: Question, select: "_id title createdAt" },
        { path: "author", model: User, select: "_id name picture" },
      ]);
    const answersCount = await Answer.countDocuments({ author: user._id });
    console.log(answersCount);
    const questionsCount = await Question.countDocuments({ author: user._id });
    return { answersCount, questionsCount, user, questions, answers };
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const saveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found");
    }
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true },
      );
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectDb();
    const { clerkId, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: { $regex: new RegExp(searchQuery, "i") },
        }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });
    const savedQuestion = user.saved;
    return savedQuestion;
  } catch (error: any) {
    console.log("error:" + error.message);
  }
};
